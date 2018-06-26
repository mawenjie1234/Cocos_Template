package game;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.text.TextUtils;

import com.google.gson.Gson;
import com.ihs.app.analytics.HSAnalytics;
import com.ihs.app.framework.HSApplication;
import com.ihs.app.utils.HSVersionControlUtils;
import com.ihs.commons.config.HSConfig;
import com.ihs.commons.utils.HSLog;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

public class CCNativeAPIProxy {


    public static void dismissSplashView() {
        NativeAPI.sharedInstance().dismissSplashView();
    }

    // event
    public static void logEventWithJSON(String eventName, String json) {
        Map<String, String> event = new HashMap<>();
        if (json != null && json.length() > 0) {
            try {
                JSONObject jsonEvent = new JSONObject(json);
                Iterator<String> keys = jsonEvent.keys();
                while (keys.hasNext()) {
                    String key = keys.next();
                    Object value = jsonEvent.get(key);
                    if (value != null) {
                        event.put(key, value.toString());
                    }
                }
            } catch (JSONException ex) {
                HSLog.e(ex.toString());
            }
        }
        HSAnalytics.logEvent(eventName, event);
    }

    public static void logFirebaseEvent(String eventName, String json) {
        NativeAPI.sharedInstance().logFirebaseEvent(eventName, json);
    }

    public static void logGAEvent(String category, String action, String label, String value) {
        Long v = null;
        if (!TextUtils.isEmpty(value)) {
            try {
                v = Long.parseLong(value);
            } catch (NumberFormatException e) {
                HSLog.e("Error parsing GA parameter " + value);
            }
        }
        GALogUtil.logGameEvent(category, action, label, v);
    }

    public static void logFBEvent(String eventName) {
        HSAnalytics.logFBEvent(eventName);
    }


    public static void showQuitApplicationWarning() {
        NativeAPI.sharedInstance().showQuitApplicationWarning();
    }

    public static void quitApplication() {
        NativeAPI.sharedInstance().quitApplication();
    }

    public static String locale() {
        return Locale.getDefault().toString();
    }

    public static String getSystemApiLevel() {
        return "" + android.os.Build.VERSION.SDK_INT;
    }

    public static String getConfigList(String keyPath) {
        String[] keyPathComponents = keyPath.split("\\.");
        List<?> list = HSConfig.getList(keyPathComponents);
        Gson gson = new Gson();
        String jsonStr = gson.toJson(list);
        HSLog.d("getConfigList(" + keyPath + ") " + jsonStr);
        return jsonStr;
    }

    public static String getConfigMap(String keyPath) {
        String[] keyPathComponents = keyPath.split("\\.");
        Map<?, ?> configMap = HSConfig.getMap(keyPathComponents);
        Gson gson = new Gson();
        String jsonStr = gson.toJson(configMap);
        HSLog.d(jsonStr);
        return jsonStr;
    }

    public static String getConfigString(String keyPath) {
        String[] keyPathComponents = keyPath.split("\\.");
        return HSConfig.getString(keyPathComponents);
    }

    public static String getConfigInt(String keyPath) {
        String[] keyPathComponents = keyPath.split("\\.");
        return "" + HSConfig.optInteger(0, keyPathComponents);
    }

    public static String getConfigBoolean(String keyPath) {
        String[] keyPathComponents = keyPath.split("\\.");
        boolean value = HSConfig.optBoolean(false, keyPathComponents);
        return value ? "true" : "false";
    }

    public static void shareAppLinkViaFacebook() {
        NativeAPI.sharedInstance().shareAppLinkViaFacebook();
    }

    public static void showRateAlert() {
        NativeAPI.sharedInstance().showRateAlert();
    }

    public static String getAudienceInfo() {
        return NativeAPI.sharedInstance().getAudienceInfo();
    }


    public static String getUserMediaSource() {
        return NativeAPI.sharedInstance().getUserMediaSource();
    }


    public static String getDeviceId() {
        return NativeAPI.sharedInstance().getDeviceId();
    }

    public static void reportJSError(String errJSONStr) {
        NativeAPI.sharedInstance().reportJSError(errJSONStr);
    }

    public static String onJSInited() {
        return NativeAPI.sharedInstance().onJSInitied();
    }



    public static String networkStatus() {
        Context ctx = NativeAPI.sharedInstance().getContext();
        ConnectivityManager cm = ctx == null ? null : (ConnectivityManager) ctx.getSystemService(Context.CONNECTIVITY_SERVICE);
        if (cm == null) {
            return "";
        }
        NetworkInfo networkInfo = cm.getActiveNetworkInfo();
        if (networkInfo == null) {
            return "";
        }

        int netType = networkInfo.getType();
        switch (netType) {
            case ConnectivityManager.TYPE_MOBILE:
                return "wwan";
            case ConnectivityManager.TYPE_WIFI:
                return "wifi";
            default:
                return "";
        }
    }

    public static void downloadURL(final String url, final String savePath, final boolean shouldUnzip) {
        NativeDownloader.getInstance().downloadURL(url, savePath, shouldUnzip);
    }

    public static void gotoMarket() {
        NativeAPI.sharedInstance().gotoMarket();
    }

    public static int getAppVersionCode() {
        return HSVersionControlUtils.getAppVersionCode();
    }

    public static boolean sendEmail() {
        return NativeAPI.sharedInstance().sendEmail();
    }


    public static boolean isFacebookUser() {
        return NativeAPI.sharedInstance().isFacebookUser();
    }

    public static boolean isNewUser() {
        return HSApplication.getFirstLaunchInfo().appVersionCode == HSVersionControlUtils.getAppVersionCode();
    }

    public static boolean isGDPRGranted() {
        return false;
    }

    public static boolean isGDPRUser() {
        return false;
    }



    // ads
    public static void playFullScreenAd(String type) {
        InterstitialADHelper.sharedInstance().playFullScreenAd(type);
    }

    public static void showRewardedVideo() {
        RewardedVideo.sharedInstance().showRewardedVideo();
    }

    public static void loadRewardVideo(String placement) {
        RewardedVideo.sharedInstance().loadRewardedVideoAd();
    }

    public static void showExpressAd(String view) {
        //NativeAPI.sharedInstance().showExpressAd(view);
    }

    public static void hideExpressAd(String view) {
        //NativeAPI.sharedInstance().hideExpressAd(view);
    }
}
