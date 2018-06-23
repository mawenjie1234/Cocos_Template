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
}
