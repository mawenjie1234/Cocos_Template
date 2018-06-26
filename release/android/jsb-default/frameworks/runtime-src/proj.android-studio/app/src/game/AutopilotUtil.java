package game;

import com.ihs.commons.utils.HSLog;

import net.appcloudbox.autopilot.AutopilotConfig;
import net.appcloudbox.autopilot.AutopilotEvent;

/**
 * Created by xu.zhang on 19/07/2017.
 */

public class AutopilotUtil {
    public static boolean getAutopilotBoolInTopic(String topicId, String variationX, boolean defaultValue){
        return AutopilotConfig.getBooleanToTestNow(topicId,variationX,defaultValue);
    }

    public static String getAutopilotDoubleInTopic(String topicId, String variationX, String defaultValue){
        return ""+AutopilotConfig.getStringToTestNow(topicId,variationX,defaultValue);
    }

    public static String getAutopilotStringInTopic(String topicId, String variationX, String defaultValue){
        return AutopilotConfig.getStringToTestNow(topicId,variationX,defaultValue);
    }

    public static void logTopicEvent(String topicID, String eventName, String eventValue){
        double value = 1;
        try {
            value = Double.parseDouble(eventValue);
        }
        catch(Exception ex){
            HSLog.e("error parsing value "+eventValue);
            ex.printStackTrace();
        }
        AutopilotEvent.logTopicEvent(topicID, eventName, value);
    }
    public static void logAppEvent(String eventName){
        AutopilotEvent.logAppEvent(eventName);
    }
    public static void logAppEvent(final String eventName, int eventValue){
        AutopilotEvent.logAppEvent(eventName,(double)eventValue);
    }

}
