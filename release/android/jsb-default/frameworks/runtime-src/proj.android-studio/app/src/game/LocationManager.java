package game;

import android.os.Handler;
import android.os.Looper;

import com.ihs.app.framework.HSApplication;
import com.ihs.commons.countrycode.HSCountryCodeManager;
import com.ihs.commons.location.HSLocationManager;

/**
 * Created by xu.zhang on 3/31/17.
 */

public class LocationManager {

    private static LocationManager instance;
    private HSLocationManager locationManager;

    public static LocationManager getInstance() {
        if (null == instance) {
            synchronized (LocationManager.class) {
                if(null == instance) {
                    instance = new LocationManager();
                }
            }
        }
        return instance;
    }

    private LocationManager(){
        locationManager = new HSLocationManager(HSApplication.getContext());
    }


    public int getTimeZone(){
        return locationManager.getTimezone();
    }

    public String getCountryCode(){
        return HSCountryCodeManager.getInstance().getCountryCode();
    }
}
