import NativeCaller, { JNIType } from "../../Base/NativeCaller";

export default class FullscreenAd{
    /**
     * @type {FullscreenAd}
     */
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
        return "GameWon0";
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
        new NativeCaller(NativeCaller.defaultClassName, "showFullscreenAd")
            .argument(placement, "", JNIType.string)
            .call(JNIType.void);
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