import RewardAd from "../Framework/Ads/RewardAd"
import FullscreenAd from "../Framework/Ads/FullscreenAd"

const {ccclass, properties} = cc._decorator;
@ccclass
export default class GameController extends cc.Component{

    // @properties(cc.Label)
    

    // use this for initialization
    onLoad () {
        
    }

    showFullscreenAd(){
        FullscreenAd.shared.showFullscreenAd("game_won");
    }

    showRewardAd(){
        RewardAd.shared.showReward("game_won");
    }

    showExpressAd(){
        
    }
}
