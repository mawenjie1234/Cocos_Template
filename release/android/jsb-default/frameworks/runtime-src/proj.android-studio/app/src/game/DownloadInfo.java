package game;

import com.ihs.app.framework.HSApplication;

import java.util.UUID;

/**
 * Created by xu.zhang on 06/07/2017.
 */

public class DownloadInfo {
    public String savePath;
    public String cachePath;
    public float progress;

    public DownloadInfo(String path){
        this.savePath = path;
        this.cachePath = HSApplication.getContext().getFilesDir().getAbsolutePath()+"/downloadCache/"+ UUID.randomUUID();
    }

}


