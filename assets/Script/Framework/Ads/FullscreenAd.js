import NativeCaller, { JNIType } from "../../Base/NativeCaller";

export default class FullscreenAd{
    static get shared(){
        if(!this._init){
            this._init = new FullscreenAd();
        }
        return this._init;
    }

    constructor(){

    }

    getPlacementName(occasion){
        if(!occasion){
            return;
        }
        return "Game";
    }

    getFullscreenAdCount(occasion){
        if(!occasion){
            return;
        }
    }

    showFullscreenAd(occasion){
        if(!occasion){
            return;
        }
        let placement = this.getPlacementName(occasion);
        let isShowSucceeded = new NativeCaller(NativeCaller.defaultClassName, "showFullscreenAd")
            .argument(placement, "", JNIType.string)
            .call(JNIType.boolean);
        return isShowSucceeded;
    }

    onFullScreenAdDisplayed(){
        cc.log("js onFullScreenAdDisplayed");
    }
    
    onFullScreenAdClicked(){
        cc.log("js onFullScreenAdClicked");
    }

    onFullScreenAdClosed(){
        cc.log("js onFullScreenAdClosed");
    }

}