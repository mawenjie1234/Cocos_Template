package game;

import android.os.Handler;
import android.os.Looper;

import com.ihs.app.analytics.HSAnalytics;
import com.ihs.commons.utils.HSLog;

import net.appcloudbox.ads.base.AcbInterstitialAd;
import net.appcloudbox.ads.interstitialad.AcbInterstitialAdLoader;
import net.appcloudbox.ads.interstitialad.AcbInterstitialAdManager;
import net.appcloudbox.autopilot.AutopilotEvent;

import org.cocos2dx.javascript.AppActivity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class InterstitialADHelper implements AcbInterstitialAdLoader.AcbInterstitialAdLoadListener{

    private static InterstitialADHelper _instance;
    private Map<String, List<AcbInterstitialAd>> cachedInterstitialAds;
    private Map<String,AcbInterstitialAdLoader> interstitialLoader = new HashMap<>();
    private int loadCount;
    private boolean isFullScreenAdDisplaying = false;
    private AppActivity cocos2dxActivity;



    public static InterstitialADHelper sharedInstance() {
        if (_instance == null) {
            synchronized (NativeAPI.class) {
                if (_instance == null) {
                    _instance = new InterstitialADHelper();
                }
            }
        }
        return _instance;
    }

    public void  init(AppActivity cocos2dxActivity){
        loadCount = 1;
        this.cocos2dxActivity = cocos2dxActivity;
    }

    public static int getFullScreenAdCountAndLoadIfNeed(String placement){
        int count = 0;
        List<AcbInterstitialAd> adList = InterstitialADHelper.sharedInstance().cachedInterstitialAds.get(placement);
        if(adList != null && !adList.isEmpty()){
            count = adList.size();
        }else {
            InterstitialADHelper.sharedInstance().loadFullScreenAd(placement);
        }
        return count;
    }


    public void loadFullScreenAd(final String placement) {

        if (interstitialLoader.get(placement) != null){
            return;
        }
        Handler mainHandler = new Handler(Looper.getMainLooper());
        mainHandler.post(new Runnable() {
            public void run() {
                GALogUtil.logGameEvent("ad", "fullscreen_ad_requested", null, null);
                AcbInterstitialAdLoader loader =  AcbInterstitialAdManager.createLoaderWithPlacement(placement);
                loader.load(loadCount, InterstitialADHelper.this);
                interstitialLoader.put(placement, loader);
                NativeAPI.sharedInstance().callPlatformJS("onFullScreenRequest", "", "");
            }
        });
    }



    public void showFullScreenAd(final String placement) {
        HSLog.d("show full screen Ads get Called" + placement);
        HSAnalytics.logEvent("Fullscreen_Ad_Will_Show");
        List<AcbInterstitialAd> adList = this.cachedInterstitialAds.get(placement);
        if(adList != null && !adList.isEmpty()){
            final AcbInterstitialAd cachedAd = adList.get(0);
            if(cachedAd != null){
                cachedAd.setInterstitialAdListener(new AcbInterstitialAd.IAcbInterstitialAdListener() {
                    @Override
                    public void onAdDisplayed() {
                        // 广告页被展示回调
                        isFullScreenAdDisplaying = true;
                        Map<String, String> event = new HashMap<>();
                        event.put("type",placement);
                        AutopilotEvent.onAdShow();
                        HSAnalytics.logEvent("Fullscreen_Ad_Did_Show", event);
                        GALogUtil.logGameEvent("ad", "Fullscreen_Ad_Did_Show", placement, null);
                        NativeAPI.sharedInstance().callPlatformJS("onFullScreenAdDisplayed", "", "");
                    }

                    @Override
                    public void onAdClicked() {
                        // 广告被点击回调
                        //AutopilotEvent.onAdClick();
                        NativeAPI.sharedInstance().callPlatformJS("onFullScreenAdClicked", "", "");
                    }

                    @Override
                    public void onAdClosed() {
                        isFullScreenAdDisplaying = false;
                        callJSOnFullScreenAdClosed();
                        cachedAd.release();
                    }
                });

                cachedAd.show();
                adList.remove(cachedAd);
            }
        }

        this.loadFullScreenAd(placement);
    }


    public void playFullScreenAd(final String placementName) {
        Handler mainHandler = new Handler(Looper.getMainLooper());
        mainHandler.post(new Runnable() {
            @Override
            public void run() {
                showFullScreenAd(placementName);
            }
        });
    }

    @Override
    public void onAdReceived(final AcbInterstitialAdLoader acbInterstitialAdLoader, List<AcbInterstitialAd> list) {
        if (!list.isEmpty()) {
            HSLog.d("full screen Ads load successfully");
            final AcbInterstitialAd ad = list.get(0);
            final String type = acbInterstitialAdLoader.getAdPlacement();
            putAdInCache(type, ad);
        }
    }

    private void putAdInCache(String placementName, AcbInterstitialAd ad){
        List<AcbInterstitialAd> placementAdList = this.cachedInterstitialAds.get(placementName);
        if(placementAdList == null){
            placementAdList = new ArrayList<>();
            this.cachedInterstitialAds.put(placementName, placementAdList);
        }
        placementAdList.add(ad);
    }


    @Override
    public void onAdFinished(AcbInterstitialAdLoader acbInterstitialAdLoader, net.appcloudbox.ads.common.utils.AcbError acbError) {
        interstitialLoader.remove(acbInterstitialAdLoader.getAdPlacement());
        if (acbError == null) {
            HSLog.d("error message is null, ad successfully requested");
        } else {
            Map<String, String> event = new HashMap<>();
            event.put("errorMessage", acbError.getMessage());
            HSLog.d("InterstitialADHelper", "onAdFinished:Fullscreen_Ad_Request_Failed");
            HSAnalytics.logEvent("Fullscreen_Ad_Request_Failed", event);
            GALogUtil.logGameEvent("ad", "fullscreen_ad_request_failed", acbError.getMessage(), null);
        }
    }

    private void callJSOnFullScreenAdClosed() {

        Handler mainHandler = new Handler(Looper.getMainLooper());
        mainHandler.postDelayed(new Runnable() {
            @Override
            public void run() {
                NativeAPI.sharedInstance().callPlatformJS("onFullScreenAdClosed", "", "");
            }
        },100);

    }

}
