package game;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.ihs.app.framework.HSApplication;

import java.util.Locale;

/**
 * Created by justbilt on 4/6/16.
 */
public class Utils {
    public static Context mContext;
    public static Activity mActivity;
    public static String hostIPAdress = "0.0.0.0";


    public static void init() {

    }

    public static String getHostIpAddress() {
        WifiManager wifiMgr = (WifiManager) mContext.getSystemService(Context.WIFI_SERVICE);
        WifiInfo wifiInfo = wifiMgr.getConnectionInfo();
        int ip = wifiInfo.getIpAddress();
        return ((ip & 0xFF) + "." + ((ip >>>= 8) & 0xFF) + "." + ((ip >>>= 8) & 0xFF) + "." + ((ip >>>= 8) & 0xFF));
    }

    public static void jump2market() {
        String mAddress = "market://details?id=" + HSApplication.getContext().getPackageName();
        Intent marketIntent = new Intent("android.intent.action.VIEW");
        marketIntent.setData(Uri.parse(mAddress));
        marketIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        HSApplication.getContext().startActivity(marketIntent);
    }

    public static String getAppName() {
        int stringId = HSApplication.getContext().getApplicationInfo().labelRes;
        return HSApplication.getContext().getString(stringId);
    }

    public static String getVersionName() {
        String versionName = "unknown";
        try {
            PackageInfo pInfo = HSApplication.getContext().getPackageManager().getPackageInfo(HSApplication.getContext().getPackageName(), 0);
            versionName = pInfo.versionName;
        } catch (PackageManager.NameNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return versionName;
    }

    public static String getVersionCode() {
        String versionName = "unknown";
        try {
            PackageInfo pInfo = HSApplication.getContext().getPackageManager().getPackageInfo(HSApplication.getContext().getPackageName(), 0);
            versionName = String.valueOf(pInfo.versionCode);
        } catch (PackageManager.NameNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return versionName;
    }

    public static int getAppMetaData(String key, int def) {
        int value = def;
        try {
            ApplicationInfo app = HSApplication.getContext().getPackageManager().getApplicationInfo(HSApplication.getContext().getPackageName(), PackageManager.GET_META_DATA);
            Bundle bundle = app.metaData;
            value = bundle.getInt(key);

        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        } catch (NullPointerException e) {
            e.printStackTrace();
        }

        return value;
    }

    public static String getAppMetaData(String key, String def) {
        String value = def;
        try {
            ApplicationInfo app = HSApplication.getContext().getPackageManager().getApplicationInfo(HSApplication.getContext().getPackageName(), PackageManager.GET_META_DATA);
            Bundle bundle = app.metaData;
            value = bundle.getString(key);

        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        } catch (NullPointerException e) {
            e.printStackTrace();
        }

        return value;
    }

    public static String getFlavorName() {
        return Utils.getAppMetaData("APP_FLAVOR_NAME", "mafiagame");
    }

    public static String getChannelName() {
        return Utils.getAppMetaData("UMENG_CHANNEL", "mafiagame");
    }

    public static String getCountryCode() {
        return Locale.getDefault().getCountry();
    }

    public static String getLanguageCode() { return Locale.getDefault().toString();}

    public static String getApplicationId() { return HSApplication.getContext().getPackageName();}


    public static Throwable makeException(String error_message, String traceback) {
        Throwable throwable = new Throwable();
        String[] trace_back = traceback.split("\\n");
        StackTraceElement[] all_element = new StackTraceElement[trace_back.length];

        all_element[0] = new StackTraceElement(error_message, ""+error_message.hashCode(), ""+traceback.hashCode(), 0);
        for (int i = 1; i < trace_back.length; i++) {
            all_element[i] = new StackTraceElement(trace_back[i], "", "", 0);
        }

        throwable.setStackTrace(all_element);

        return throwable;
    }

    public static void showWrongToast(String msg) {
        Log.e("Something Was Wrong:", msg);
        mActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(HSApplication.getContext(), "Something Was Wrong !", Toast.LENGTH_LONG).show();
            }
        });
    }
}
