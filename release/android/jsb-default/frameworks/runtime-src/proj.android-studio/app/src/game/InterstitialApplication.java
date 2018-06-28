package game;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.support.multidex.MultiDex;
import android.util.Log;

import com.crashlytics.android.Crashlytics;
import com.facebook.ads.AdSettings;
import com.ihs.app.alerts.HSAlertMgr;
import com.ihs.app.framework.HSApplication;
import com.ihs.app.framework.HSNotificationConstant;
import com.ihs.commons.notificationcenter.HSGlobalNotificationCenter;
import com.ihs.commons.notificationcenter.INotificationObserver;
import com.ihs.commons.utils.HSBundle;
import com.ihs.commons.utils.HSLog;

import net.appcloudbox.AcbAds;
import net.appcloudbox.ads.expressad.AcbExpressAdManager;
import net.appcloudbox.ads.interstitialad.AcbInterstitialAdManager;
import net.appcloudbox.ads.nativead.AcbNativeAdManager;
import net.appcloudbox.ads.rewardad.AcbRewardAdManager;
import net.appcloudbox.autopilot.AutopilotConfig;

import io.fabric.sdk.android.Fabric;




public class InterstitialApplication extends HSApplication {


    private INotificationObserver sessionEventObserver = new INotificationObserver() {

        @Override
        public void onReceive(String notificationName, HSBundle bundle) {
            if (HSNotificationConstant.HS_SESSION_START.equals(notificationName)) {
                HSAlertMgr.delayRateAlert();
            }
            else if(HSNotificationConstant.HS_SESSION_END.equals(notificationName)){
                NativeAPI.sharedInstance().sessionEndJS();
            }
        }
    };

    private BroadcastReceiver broadcastReceiver;

    private void registerAutopilotBroadcastReceiver(){
        try {
            IntentFilter intentFilter = new IntentFilter();
            intentFilter.addAction(AutopilotConfig.ACTION_CONFIG_FETCH_FINISHED);
            broadcastReceiver = new BroadcastReceiver() {
                @Override
                public void onReceive(Context context, Intent intent) {
                    Log.d("autopilot","call js to clear cache");
                    NativeAPI.sharedInstance().callJS("require('AutopilotManager').clearCache()");
                }
            };
            registerReceiver(broadcastReceiver, intentFilter);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @Override
    public void onCreate() {
        Log.d("INIT","initialization application started");
        super.onCreate();
        HSLog.setEnabled(true);
        if (isMainProcess()) {
            AcbAds.getInstance().initializeFromGoldenEye(HSApplication.instance);
            Fabric.with(this, new Crashlytics());
            registerAutopilotBroadcastReceiver();
            HSGlobalNotificationCenter.addObserver(HSNotificationConstant.HS_SESSION_START, sessionEventObserver);
            HSGlobalNotificationCenter.addObserver(HSNotificationConstant.HS_SESSION_END, sessionEventObserver);
            AdSettings.addTestDevice("69d57ee369d47d3156bac51a99ecb2ce");
            AcbInterstitialAdManager.getInstance().activePlacementInProcess("GameWon0");
            AcbRewardAdManager.getInstance().activePlacementInProcess("Reward0");
            AcbExpressAdManager.getInstance().activePlacementInProcess("Banner0");
            //AutopilotConfig.initialize(this, "AutopilotConfig.json", HSApplication.getInstallationUUID());
        }
    }


    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }


    @Override
    public void onTerminate() {
        HSGlobalNotificationCenter.removeObserver(sessionEventObserver);
        super.onTerminate();
    }

    // your package name is the same with your main process name
    private boolean isMainProcess() {
        return getPackageName().equals(getProcessName());
    }

}

