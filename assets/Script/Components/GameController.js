import FullscreenAd from "../Framework/Ads/FullscreenAd"
import RewardAd from "../Framework/Ads/RewardAd";

const {ccclass, properties} = cc._decorator;
@ccclass
export default class GameController extends cc.Component{

    // @properties(cc.Label)
    

    // use this for initialization
    onLoad () {
        
    }

    showFullscreenAd(){
        FullscreenAd.shared.showFullscreenAd("GameWon0");
    }

    showRewardAd(){
        RewardAd.shared.showReward("Reward0");
    }

    showExpressAd(){
        
    }
}
