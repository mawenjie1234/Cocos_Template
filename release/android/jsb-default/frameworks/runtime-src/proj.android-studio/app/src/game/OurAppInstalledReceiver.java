package game;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.text.TextUtils;

import com.ihs.commons.utils.HSLog;
import com.ihs.commons.utils.HSPreferenceHelper;

import java.util.HashMap;
import java.util.Map;


/**
 * Created by caoyixiong on 17/10/12.
 */

public class OurAppInstalledReceiver extends BroadcastReceiver {

    private static final String REFERRER_LOGGED = "REFERRER_LOGGED";

    @Override
    public void onReceive(Context context, Intent intent) {

        if (HSPreferenceHelper.getDefault().contains(REFERRER_LOGGED)) {
            return;
        }

        HSPreferenceHelper.getDefault().putBoolean(REFERRER_LOGGED, true);

        HSLog.d("OurAppInstalledReceiver", "onReceiver referrer = " + intent.getStringExtra("referrer"));

        String referrerString = intent.getStringExtra("referrer");

        LauncherAnalytics.logEvent("utm_source", "source", referrerString);

        if (TextUtils.isEmpty(referrerString)) {
            return;
        }

        try {
            String decodeContent = Uri.decode(referrerString);
            if (!decodeContent.contains("internal")) {
                return;
            }

            Map<String, String> referrer = new HashMap<>();

            String[] strings = decodeContent.split("&");

            for (String string : strings) {
                int index = string.indexOf("=");
                if (index < 0) {
                    continue;
                }
                if (string.contains("internal")) {
                    continue;
                }
                referrer.put(string.substring(0, index), string.substring(index + 1, string.length()));
            }
            LauncherAnalytics.logEvent("Source_Channel_Internal", referrer);
        } catch (Exception e) {
            HSLog.e("referrer error");
        }
    }
}