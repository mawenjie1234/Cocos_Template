package game;

import android.os.Handler;
import android.os.Looper;

import com.ihs.app.analytics.HSAnalytics;
import com.ihs.app.framework.HSApplication;
import com.ihs.commons.utils.HSLog;

import net.appcloudbox.ads.base.AcbRewardAd;
import net.appcloudbox.ads.rewardad.AcbRewardAdLoader;
import net.appcloudbox.ads.rewardad.AcbRewardAdManager;
import net.appcloudbox.common.utils.AcbError;

import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

/**
 * Created by mawenjie on 2017/9/16.
 */

public class RewardedVideo {
    private static RewardedVideo _instance;
    private Handler mainHandler;
    private String defaultPlacementName = "Reward0";
    private AcbRewardAd showingAd;
    public static Queue<AcbRewardAd> rewardsVideoAds = new LinkedList<>();

    private RewardedVideo(){
        mainHandler =  new Handler(Looper.getMainLooper());
    }

    public static RewardedVideo sharedInstance() {
        if (_instance == null) {
            synchronized (NativeAPI.class) {
                if (_instance == null) {
                    _instance = new RewardedVideo();
                }
            }
        }
        return _instance;
    }


    public void loadRewardedVideoAd(){
        mainHandler.post(new Runnable() {
            @Override
            public void run() {
                if (rewardsVideoAds.size()>0){
                    return;
                }
                AcbRewardAdLoader loader = AcbRewardAdManager.createLoaderWithPlacement(defaultPlacementName);
                AcbRewardAdLoader.AcbRewardAdLoadListener loadListener = new AcbRewardAdLoader.AcbRewardAdLoadListener() {
                    @Override
                    public void onAdReceived(AcbRewardAdLoader acbRewardAdLoader, List<AcbRewardAd> list) {
                        if(!list.isEmpty()){
                            rewardsVideoAds.addAll(list);
                            NativeAPI.sharedInstance().callJS("require('AdsManager').shared.onRewardVideoLoadSuccess(1)");
                        }
                    }

                    @Override
                    public void onAdFinished(AcbRewardAdLoader acbRewardAdLoader, net.appcloudbox.ads.common.utils.AcbError acbError) {
                        if (acbError != null) {
                            HSLog.d("reward video load failed "+acbError.getMessage());
                            HSAnalytics.logEvent("RewardedVideoFailure","error",acbError.getMessage());
                        }
                    }
                };
                NativeAPI.sharedInstance().callJS("require('AdsManager').shared.onRewardedVideoRequest()");
                loader.load(1, loadListener);
            }
        });
    }

    public void showRewardedVideo(){
        mainHandler.post(new Runnable() {
            @Override
            public void run() {
                showingAd = rewardsVideoAds.poll();
                if (showingAd != null) {
                    showingAd.setRewardAdListener(new AcbRewardAd.IAcbRewardAdListener() {
                        @Override
                        public void onRewarded(int i) {
                            HSLog.d(">>>> android onRewarded");
                            Handler mainHandler = new Handler(Looper.getMainLooper());
                            mainHandler.postDelayed(new Runnable() {
                                @Override
                                public void run() {
                                    NativeAPI.sharedInstance().callJS("require('AdsManager').shared.onReward()");
                                }
                            },100);
                        }

                        @Override
                        public void onAdClicked() {

                        }

                        @Override
                        public void onAdClosed() {
                            HSLog.d(">>>>onRewardedVideoAdClosed");
                            Handler mainHandler = new Handler(Looper.getMainLooper());
                            mainHandler.postDelayed(new Runnable() {
                                @Override
                                public void run() {
                                    NativeAPI.sharedInstance().callJS("require('AdsManager').shared.onRewardedVideoClose()");
                                }
                            },100);

                            showingAd.release();
                            showingAd = null;
                            loadRewardedVideoAd();
                        }

                        @Override
                        public void onAdDisplay() {
                            NativeAPI.sharedInstance().callJS("require('AdsManager').shared.onRewardedVideoAdOpened()");
                            HSLog.d(">>>>onRewardedVideoAdOpened");
                        }
                    });
                    showingAd.show();
                }else{
                    NativeAPI.sharedInstance().callJS("require('AdsManager').shared.onRewardedFailedToShow()");
                }
            }
        });

    }

    public static int getRewardViewCount(){
        int count = rewardsVideoAds.size();
        if(count == 0){
            sharedInstance().loadRewardedVideoAd();
        }
        return count;
    }

}
