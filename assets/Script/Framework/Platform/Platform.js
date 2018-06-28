import NativeCaller, { JNIType } from "../../Base/NativeCaller";

/**
 * 若已经测试过的函数 则对应的写一个 Android/ios  
 * 还需要添加的函数但是还没有写的 ： 
 * 1. reportJSError
 * 
 * 需要重构的点:
 * 1 getConfig 需要统一ios和Android的函数名，避免判断。
 */
export default class Platform{

    static get isIOS () {
        return cc.sys.os === cc.sys.OS_IOS && !cc.sys.isBrowser;
    };
    
    static get isAndroid() {
        return cc.sys.os === cc.sys.OS_ANDROID && !cc.sys.isBrowser;
    };

    static get isBrowser (){
        return cc.sys.isBrowser;
    };

    static dismissSplashView(){
        new NativeCaller(NativeCaller.defaultClassName, "dismissSplashView")
            .call(JNIType.void);
    }

    static showQuitApplicationWarning(){
        if(!this.isAndroid){
            return false;
        }
        new NativeCaller(NativeCaller.defaultClassName, "showQuitApplicationWarning").call(JNIType.void);
    }

    static quitApplication(){
        if(!this.isAndroid){
            return
        }
        new NativeCaller(null, "quitApplication").call(JNIType.void);
    }

    /**
     * @type {string}
     */
    static locale(){
       return new NativeCaller(null, "locale").call(JNIType.string);
    }

    static notifyJSInited(){
        new NativeCaller(null, "onJSInited").call(JNIType.void);
    }

    static getDeviceId(){
        return NativeCaller(null, "getDeviceId").call(JNIType.string);
    }

    // “pad”, "phone"
    static isPad(){
        return (NativeCaller(null, "getDeviceType").call(JNIType.string) == "phone");
    }

    static shareOnFacebook(){
        new NativeCaller(null, "shareAppLinkViaFacebook").call();
    }

    static gotoWriteReview(){
        let method = this.isAndroid ? "gotoWriteReview" : "gotoMarket";
        new NativeCaller(null, method).call();
    }

    static gotoMarket(){
        new NativeCaller(null, "gotoMarket").call();
    }

    /**
     * @type {number}
     */
    static getAppVersionCode(){
       return new NativeCaller(null, "getAppVersionCode").call(JNIType.int);
    }

    /**
     * @type {Array}
     */
    /// Get RemoteConfig array/list by keyPath
    static getConfigList(keyPath){
        let method = this.isAndroid ? "getConfigList" : "getConfigArrayWithKeyPath";
        return JSON.parse( new NativeCaller(null, method).argument(keyPath, "", JNIType.string).call(JNIType.string) );
    }

    static getConfigMap(keyPath){
        let method = this.isAndroid ? "getConfigMap" : "getConfigDictionaryWithKeyPath";
        return JSON.parse( new NativeCaller(null, method).argument(keyPath, "", JNIType.string).call(JNIType.string) );
    }

    /**
     * 
     * @param {string} keyPath 
     * @param {boolean} defaultValue 
     * @type {boolean}
     */
    static getConfigBoolean(keyPath, defaultValue){
        let method = this.isAndroid ? "getConfigBoolean" : "getConfigString";
        let result = new NativeCaller(null, method).argument(keyPath, "", JNIType.string).call(JNIType.string);
        return result ? result == "true" || result == "1" : defaultValue;
    }

    static getConfigString (keyPath, defaultValue) {
        return new NativeCaller(null, "getConfigString").argument(keyPath, "", JNIType.string).call(JNIType.string) || defaultValue
    }
    
    static getConfigInt (keyPath, defaultValue) {
        let method = this.isAndroid ? "getConfigInt" : "getConfigString";
        let resultStr = new NativeCaller(null, method).argument(keyPath, "", JNIType.string).call(JNIType.string);
        return resultStr || defaultValue || 0;
    };

    static sendEmail(){
        new NativeCaller(null , "sendEmail").call();
    }

    static getAndroidSystemApiLevel(){
        if(!this.isAndroid){
            return -1;
        }
        return new NativeCaller(null, "getSystemApiLevel").call(JNIType.string);
    }

    static getUserMediaSource(){
        return new NativeCaller(null, "getUserMediaSource").call(JNIType.string) || "null";
    }

    static isNewUser(){
        return new NativeCaller(null, "isNewUser").call(JNIType.boolean) || false;
    }

    static networkStatus(){
        if(!cc.sys.isNative){
            return "wifi"
        }
        return new NativeCaller(null, "networkStatus").call(JNIType.string);
    }

    /**
     * @type {boolean}
     */
    static isWifi(){
        let networkStatus = this.networkStatus;
        return networkStatus === "wifi"
    }

    static isNetWorkReady(){
        return this.networkStatus == "wifi" || this.networkStatus == "wwan";
    }

    static isNaturalUser(){
        return new NativeCaller(null, "isNaturalUser").call(JNIType.boolean);
    }

    static isFacebookUser(){
        return new NativeCaller(null, "isFacebookUser").call(JNIType.boolean);
    }

    static quitApplication(){
        return this.isAndroid ? new NativeCaller(null, "quitApplication").call() : false;
    }

    static showQuitApplicationWarning(){
        return this.isAndroid ? new NativeCaller(null, "showQuitApplicationWarning").call() : false;
    }

    

}
