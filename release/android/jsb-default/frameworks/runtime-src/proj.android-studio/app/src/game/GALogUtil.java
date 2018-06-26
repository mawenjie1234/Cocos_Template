package game;

import com.ihs.app.analytics.HSAnalytics;

public class GALogUtil {
    private static final String SCREEN_GAME = "SolitaireGameScene";

    public static void logGameEvent(String category, String action, String label, Long value){
        HSAnalytics.logGoogleAnalyticsEvent(SCREEN_GAME,category,action,label,value,null,null);
    }

}
