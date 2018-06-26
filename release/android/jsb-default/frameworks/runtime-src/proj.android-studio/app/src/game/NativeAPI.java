package game;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.preference.PreferenceManager;
import android.support.annotation.Keep;
import android.support.annotation.NonNull;
import android.text.TextUtils;
import android.util.Log;


import com.crashlytics.android.Crashlytics;
import com.ihs.app.alerts.HSAlertMgr;
import com.ihs.app.analytics.HSAnalytics;
import com.ihs.app.framework.HSApplication;
import com.ihs.app.utils.HSVersionControlUtils;
import com.ihs.commons.analytics.publisher.HSPublisherMgr;
import com.ihs.commons.config.HSConfig;
import com.ihs.commons.utils.HSDeviceUtils;
import com.ihs.commons.utils.HSLog;


import org.cocos2d.template.R;
import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;



@Keep
public class NativeAPI {

    private static final String TAG = NativeAPI.class.getSimpleName();

    private static NativeAPI _instance;
    private boolean isJSReady = false;
    private boolean isFullScreenAdDisplaying = false;

    private AppActivity cocos2dxActivity;
    private int loadCount;

    private SharedPreferences prefs;


    private com.google.firebase.analytics.FirebaseAnalytics mFirebaseAnalytics;

    public static NativeAPI sharedInstance() {
        if (_instance == null) {
            synchronized (NativeAPI.class) {
                if (_instance == null) {
                    _instance = new NativeAPI();

                }
            }
        }
        return _instance;
    }

    private NativeAPI() {
    }


    public void init(AppActivity cocos2dxActivity) {
        this.cocos2dxActivity = cocos2dxActivity;
        this.loadCount = 1;
        mFirebaseAnalytics = com.google.firebase.analytics.FirebaseAnalytics.getInstance(this.cocos2dxActivity);
        prefs = PreferenceManager.getDefaultSharedPreferences(HSApplication.getContext());
    }

    Context getContext() {
        return cocos2dxActivity;
    }


    public void showQuitApplicationWarning() {
        cocos2dxActivity.showQuitApplicationWarning();
    }

    public void quitApplication() {
        cocos2dxActivity.QuitApp();
    }

    public void sessionEndJS() {
        callPlatformJS("onSessionEndJS", "", "");
    }

    public void quitApplicationJS() {
        callPlatformJS("quitApplicationJS", "", "");
    }

    public void reportJSError(String errJSONStr) {
        List<String> filter = getJSErrorFilter();
        if (!isFilterOut(errJSONStr, filter)) {
            Throwable t = new Throwable(errJSONStr);
            Crashlytics.getInstance().logException(t);
        }
    }

    @NonNull
    private List<String> getJSErrorFilter() {
        List<?> configFilter = HSConfig.getList("Application", "jsExceptionFilter");
        List<String> filter;
        if (configFilter == null || configFilter.isEmpty()) {
            filter = new ArrayList<>();
            filter.add("\"TypeError: t is undefined\"");
        } else {
            filter = new ArrayList<>();
            for (Object f : configFilter) {
                filter.add(f.toString());
            }
        }
        return filter;
    }


    private boolean isFilterOut(String errJSONStr, List<String> filter) {
        for (String f : filter) {
            if (errJSONStr.contains(f) || errJSONStr.matches(f)) {
                return true;
            }
        }
        return false;
    }

    //endregion

    //region 广告相关接口


    void dismissSplashView() {
        //cocos2dxActivity.dismissSplashView();
        RewardedVideo.sharedInstance().loadRewardedVideoAd();
    }

    public String onJSInitied() {
        isJSReady = true;
        return cocos2dxActivity.getApplication().getPackageName();
    }



    //region Flurry
    public void logWithJSON(String jsonStr) {
        try {
            JSONObject jsonEvent = new JSONObject(jsonStr);
            Map<String, String> event = new HashMap<>();

            Iterator<String> keys = jsonEvent.keys();
            while (keys.hasNext()) {
                String key = keys.next();

                Object value = jsonEvent.get(key);
                if (value != null) {
                    event.put(key, value.toString());
                }
            }
            HSLog.d("NativeAPI", "logWithJSON:" + jsonStr);
            String eventNameKey = "eventName";
            if (event.containsKey(eventNameKey)) {
                String eventName = (String) event.get(eventNameKey);
                event.remove(eventNameKey);
                HSAnalytics.logEvent(eventName, event);
            }
        } catch (JSONException ex) {
            HSLog.d("NativeAPI", "exception: logWithJSON:" + jsonStr);
            HSLog.e(ex.toString());
        }
    }

    public void logFirebaseEvent(String eventName ,String json) {
        /*HSLog.d("NativeAPI", "logEvent:" + eventName);
        HSAnalytics.logEvent(eventName);*/
        Bundle bundle = new Bundle();
        mFirebaseAnalytics.logEvent(eventName, bundle);
    }

    //endregion

    //region Language

    public String locale() {
        return Locale.getDefault().toString();
    }

    public String getLanguage() {
        String locale = Locale.getDefault().toString();
        if (locale.isEmpty()) {
            locale = "en";
        }
        String langComponents[] = locale.split("_");
        langComponents = langComponents[0].split("-");
        return langComponents[0];
    }

    private String languageName(Locale locale) {
        String lang = locale.getLanguage();
        String simpleLang = lang;
        if (lang.contains("-") || lang.contains("_")) {
            int endIndex = lang.contains("-") ? lang.indexOf("-") : lang.indexOf("_");
            simpleLang = lang.substring(0, endIndex);
        }
        return simpleLang;
    }

    //endregion

    //region utils


    public void callPlatformJS(String methodName, String argName, Object argValue) {
        Map<String, Object> event = new HashMap<>();
        event.put(argName, argValue);
        callPlatformJS(methodName, event);
    }

    public void callJS(final String js) {
        if (!isJSReady){
            Log.e("js not ready", "javascript is not ready yet");
            LauncherAnalytics.logEvent("JS_Not_Ready", "Call", js);
            return;
        }
        HSLog.d("evaluate js:" + js);
        if (cocos2dxActivity != null) {
            cocos2dxActivity.runOnGLThread(new Runnable() {
                @Override
                public void run() {
                    Cocos2dxJavascriptJavaBridge.evalString(js);
                }
            });
        }

    }

    public void callPlatformJS(String methodName, Map event) {
        try {
            String jsonStr = new JSONObject(event).toString();
            jsonStr = jsonStr.replace('"', '\'');
            //TODO: 确保cocos2d js环境设置完成
            final String jsStr = "window.PlatformAPI." + methodName + "(" + jsonStr + ");";
            callJS(jsStr);

        } catch (NullPointerException ex) {
            HSLog.e("fail to call PlatformAPI:" + methodName + ". error:" + ex);
        }
    }

    public void callPlatformJS(String methodName, String arg) {
        try {

            //TODO: 确保cocos2d js环境设置完成
            final String jsStr = "window.PlatformAPI." + methodName + "('" + arg + "');";
            callJS(jsStr);

        } catch (NullPointerException ex) {
            HSLog.e("fail to call PlatformAPI:" + methodName + ". error:" + ex);
        }
    }


    public void shareAppLinkViaFacebook() {
        String urlToShare = "https://solitaire-tm-basic.tuanguwen.com/share/se/Chs";
        try {
            Intent intent1 = new Intent();
            intent1.setPackage("com.facebook.katana");
            intent1.setAction("android.intent.action.SEND");
            intent1.setType("text/plain");
            intent1.putExtra("android.intent.extra.TEXT", urlToShare);
            cocos2dxActivity.startActivity(intent1);
        } catch (Exception e) {
            // If we failed (not native FB app installed), try share through SEND
            String sharerUrl = "https://www.facebook.com/sharer/sharer.php?u=" + urlToShare;
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(sharerUrl));
            cocos2dxActivity.startActivity(intent);
        }
    }


    public void showRateAlert() {
        if (HSAlertMgr.isAlertShown()) {
            return;
        }
        HSLog.d("check And show Rate Alert native get called ");
        Handler mainHandler = new Handler(Looper.getMainLooper());
        mainHandler.postDelayed(new Runnable() {
            @Override
            public void run() {
                HSAlertMgr.showRateAlert();
            }
        }, 1000);
    }


    private String getDeviceType() {
        boolean isTablet = cocos2dxActivity.getResources().getBoolean(R.bool.isTablet);
        if (isTablet) {
            return "pad";
        }
        return "phone";
    }

    public String getDeviceId() {
        return HSApplication.getInstallationUUID();
    }


    private static final String KEY_PLATFORM = "platform";
    private static final String KEY_REGION = "region";
    private static final String KEY_APP_VERSION = "app_version";
    private static final String KEY_OS_VERSION = "os_version";
    private static final String KEY_DEVICE_TYPE = "device_type";
    private static final String KEY_DEVICE_BRAND = "device_brand";
    private static final String KEY_DEVICE_MODEL = "device_model";
    private static final String KEY_TIME_ZONE = "time_zone";


    public String getAudienceInfo() {
        Looper.prepare();
        final JSONObject audienceInfo = new JSONObject();
        try {
            audienceInfo.put(KEY_PLATFORM, "android");
            audienceInfo.put(KEY_REGION, LocationManager.getInstance().getCountryCode());
            audienceInfo.put(KEY_APP_VERSION, HSVersionControlUtils.getAppVersionName());
            audienceInfo.put(KEY_OS_VERSION, HSVersionControlUtils.getOSVersionCode());
            audienceInfo.put(KEY_DEVICE_TYPE, NativeAPI.this.getDeviceType());
            audienceInfo.put(KEY_DEVICE_BRAND, Build.MANUFACTURER);
            audienceInfo.put(KEY_DEVICE_MODEL, HSDeviceUtils.getDeviceModel());
            audienceInfo.put(KEY_TIME_ZONE, LocationManager.getInstance().getTimeZone());
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return audienceInfo.toString();
    }

    public String getUserMediaSource() {
        HSPublisherMgr.PublisherData data = HSPublisherMgr.getPublisherData(HSApplication.getContext());
        if(data == null){
            return  "unknown";
        }
        String value;
        if (data.getInstallMode()== HSPublisherMgr.PublisherData.InstallMode.UNKNOWN){
            return "unknown";
        }else if(data.getInstallMode() == HSPublisherMgr.PublisherData.InstallMode.ORGANIC){
            return "installMode_Organic";
        }else if(!TextUtils.isEmpty(data.getMediaSource())) {
            value = data.getMediaSource() + "_" + (TextUtils.isEmpty(data.getAdset()) ? "null" : data.getAdset());
        }else if(!TextUtils.isEmpty(data.getAgency())){
            value = data.getAgency();
        }else {
            value = "unknown";
        }
        return value;
    }



    public void gotoMarket(){
        Utils.jump2market();
    }

    public boolean sendEmail(){
        cocos2dxActivity.runOnUiThread(new Runnable() {
            public void run() {
                Uri uri = Uri.parse("mailto:feedback.classicsolitaire@gmail.com");
                String[] email = {"feedback.classicsolitaire@gmail.com"};
                Intent intent = new Intent(Intent.ACTION_SENDTO, uri);
                intent.putExtra(Intent.EXTRA_SUBJECT,  Utils.getAppName()
                        + "(" + Utils.getVersionName() + ")"
                        + "(" + Build.MODEL + ")"
                        + "(" + String.format("%s(%d)", Build.VERSION.RELEASE, Build.VERSION.SDK_INT) + ")"
                        + "(" + Utils.getLanguageCode() + ")"

                ); // 主题
                intent.putExtra(Intent.EXTRA_TEXT, "My Feedback:\n"); // 正文
                cocos2dxActivity.startActivityForResult(Intent.createChooser(intent, "Email"), 1);
            }
        });
        return true;
    }


    public boolean isFacebookUser(){
        HSPublisherMgr.PublisherData data = HSPublisherMgr.getPublisherData(HSApplication.getContext());
        if (data==null||data.getInstallMode()== HSPublisherMgr.PublisherData.InstallMode.UNKNOWN){
            return false;
        }
        String mediaSource = data.getMediaSource();
        return mediaSource.contains("Facebook");
    }
    //endregion

}

