import NativeCaller, { JNIType } from "../../Base/NativeCaller";

const RewardClassName = "";
export default class RewardAd{
    
    static get shared(){
        if(!this._init){
            this._init = new RewardAd();
        }
        return this.init;
    }

    constructor(){

    }

    getRewardAdCount(occasion){
        if(!occasion){
            return 0;
        }
        return NativeCaller(RewardClassName, "getRewardAdCount").argument(this.getPlacement(occasion),"",JNIType.string).call(JNIType.int);
    }

    getPlacement(occasion){
        if(!occasion){
            return;
        }
        return "Reward";
    }

    showReward(occasion){
        let placement = this.getPlacement(occasion);
        let isShowSucceeded =  new NativeCaller(RewardClassName, "showReward")
            .argument(placement, "", JNIType.string)
            .call(JNIType.boolean);
        return isShowSucceeded;
    }

    onRewardAdDisPlay(){
        cc.log(" JS onRewardAdDisPlay");
    }

    onRewardAdClick(){
        cc.log(" JS onRewardAdClick");
    }

    onRewardAdClose(){
        cc.log(" JS onRewardAdClose");
    }
    
}
