import NativeCaller, { JNIType } from "../../Base/NativeCaller";
import Storage from "../../Base/Storage";
import DateUtils from "../../Base/DateUtils";
import Platform from "../Platform/Platform";

export default class AnalyticsManager{
    
    static get shared(){
        if(!this._init){
            this._init = new AnalyticsManager();
        }
        return this._init;
    }

    static flurry (key) {
        this.log(key);
    }

    /// - Parameters:
    ///   - eventName String: 事件名
    ///   - args Dictionary?: 参数
    // TODO 
    static log (eventName, args) {
        cc.log(eventName, args ? JSON.stringify(args) : "");
        new NativeCaller(NativeCaller.defaultClassName, "logEventWithJSON")
        .argument(args ? JSON.stringify(args) : "" , "", JNIType.string)
        .call(JNIType.void);
    }


    // 弱 当天只发一次flurry， 只记录上次成功的时间。
    static logOnceInDay (eventName, args){
        let date = new Date();
        let tadayString = DateUtils.toYYYYMMDDString(date);
        let key = eventName+"@logOnceInDay";
        let lastSendTimeString = Storage.shared.loadData(key);
        let lastSendDate = new Date();
        lastSendDate.setTime(lastSendTimeString);
        if(!lastSendTimeString || DateUtils.toYYYYMMDDString(lastSendDate) != tadayString){
            Storage.shared.saveData(key, date.getTime());
            this.log(eventName, args);
        }else{
            cc.log("ignore this event");
        }
    }

    static logFirebaseEvent = function(eventName, args) {
        if (Platform.isIOS) {
            return;
        }
        new NativeCaller(NativeCaller.defaultClassName, "logFirebaseEvent")
        .argument(eventName, "", JNIType.string)
        .argument(args? JSON.stringify(args) : "", "", JNIType.string)
        .call(JNIType.void)
    }

    /// - Parameters:
    ///   - category String: 事件类型
    ///   - action String: 事件行为
    ///   - label String
    ///   - value Number
    static logGA (category, action, label, value) {
        if(Platform.isIOS){
            return;
        }
        new NativeCaller(NativeCaller.defaultClassName, "logGAEvent")
        .argument(category, "",JNIType.string)
        .argument(action, "",JNIType.string)
        .argument(label, "",JNIType.string)
        .argument(String(value), "",JNIType.string)
        .call(JNIType.void)
    }

    static logFBEvent (event) {
        if(!Platform.isAndroid){
            return;
        }
        new NativeCaller(NativeCaller.defaultClassName, "logFBEvent")
            .argument(event, "", JNIType.string)
            .call(JNIType.void);
    }
    
}
