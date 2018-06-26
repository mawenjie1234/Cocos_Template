package game;


import android.preference.PreferenceManager;
import android.text.TextUtils;

import com.ihs.app.framework.HSApplication;
import com.ihs.commons.connection.HSHttpConnection;
import com.ihs.commons.utils.HSLog;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * Created by xu.zhang on 06/07/2017.
 */

public class NativeDownloader {
    private Map downloadInfos;
    private static NativeDownloader instance;
    private ExecutorService mExecutorService;

    private NativeDownloader() {
        mExecutorService = Executors.newFixedThreadPool(2);
        this.downloadInfos = new HashMap<String, DownloadInfo>();
        File cacheDirectory = new File(HSApplication.getContext().getFilesDir().getAbsolutePath()+"/downloadCache/");
        if (!cacheDirectory.exists()){
            cacheDirectory.mkdirs();
        }
    }



    public static NativeDownloader getInstance() {
        if (null == instance) {
            synchronized (NativeDownloader.class) {
                if (null == instance) {
                    instance = new NativeDownloader();
                }
            }
        }
        return instance;
    }

    public static void downloadDeeplinkZip(String theme){
        NativeDownloader.getInstance().DownloadDeeplinkZip(theme);
    }

    public static void transferUnzipFileToSavePath(String savePath){
        String tempPath = PreferenceManager.getDefaultSharedPreferences(HSApplication.getContext()).getString("deepLinkThemeTempPath","");
        if(TextUtils.isEmpty(savePath) || TextUtils.isEmpty(tempPath)){
            return;
        }
        try{
            NativeDownloader.getInstance().moveFileOrDirectory(new File(tempPath),new File(savePath));
        }catch (IOException e) {
            e.printStackTrace();
            return;
        }
    }

    public void DownloadDeeplinkZip(String theme){
        if(PreferenceManager.getDefaultSharedPreferences(HSApplication.getContext()).getBoolean("isDownloadDeeplinkThemeKeySuccess", false)){
            return;
        }
        String value = CCNativeAPIProxy.getConfigString("Application.DeeplinkThemeDownloadUrl");
        if(TextUtils.isEmpty(value)){
            return;
        }
        String url = value + '/' + theme + ".zip";
        NativeDownloader.getInstance().DownloadURL(url,null,true, true);
    }

    public static void downloadURL(String url, String savePath, boolean shouldUnzip) {
        NativeDownloader.getInstance().DownloadURL(url,savePath,shouldUnzip,false);
    }

    public void DownloadURL(final String url, final String savePath, final boolean shouldUnzip, final boolean isNativeDownload) {
        if(!isNativeDownload){
            if (TextUtils.isEmpty(url) || TextUtils.isEmpty(savePath)) {
                HSLog.e("ArgumentInvalid");
                return;
            }
        }else{
            if (TextUtils.isEmpty(url)) {
                HSLog.e("ArgumentInvalid");
                return;
            }
        }
        if (this.downloadInfos.get(url) != null) {
            return;
        }
        final DownloadInfo dlInfo = new DownloadInfo(savePath);
        this.downloadInfos.put(url, dlInfo);
        final HSHttpConnection connection = new HSHttpConnection(url);
        HSLog.d("start downloading remote bundle");
        File downloadedFile = new File(dlInfo.cachePath + ".temp");
        if (downloadedFile.exists()){
            deleteRecursive(downloadedFile);
        }
        connection.setConnectTimeout(600000);
        connection.setDownloadFile(downloadedFile);

        mExecutorService.execute(new Runnable() {
            @Override
            public void run() {
                HSLog.d("start downloading from "+url);
                connection.startSync();
                if (connection.isSucceeded()) {
                    downloadInfos.remove(url);
                    HSLog.d("download connection finished");
                    if (saveFile(dlInfo.cachePath + ".temp",dlInfo.savePath, shouldUnzip, isNativeDownload)) {
                        onComplete(url, savePath, "",isNativeDownload);
                    }
                    else{
                        onComplete(url, savePath, "error saving file to target path",isNativeDownload);
                    }
                    HSLog.d("succesfully downloaded "+url+ " to "+savePath);
                } else {
                    HSLog.d("NativeDownloader", "Connection Response Code:" + connection.getResponseCode() + " msg:" + connection.getResponseMessage());
                    onComplete(url, savePath, "error downloading file "+connection.getResponseCode() + " msg:" + connection.getResponseMessage(),isNativeDownload);
                }
            }
        });

    }


    private void onComplete(String url, String savePath, String errorMsg, boolean isNativeDownload ){
        JSONObject argJson = new JSONObject();
        try {
            argJson.put("url",url);
            argJson.put("savePath", savePath);
            argJson.put("error",errorMsg);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        String jsonStr = argJson.toString();
        if(isNativeDownload){
            PreferenceManager.getDefaultSharedPreferences(HSApplication.getContext()).edit().putBoolean("isDownloadDeeplinkThemeKeySuccess", true).commit();
            onDeeplinkThemeDownloadSuccess();
            return;
        }
        String expr = "require('NativeDownloader').shared.didDownload("+jsonStr+")";
        //String expr = "require('NativeDownloader').shared.didDownload({})";
        NativeAPI.sharedInstance().callJS(expr);
    }

    private boolean saveFile(String zipFilePath, String savePath, boolean shouldUnzip, boolean isNativeDownload){
        if (shouldUnzip){
            HSLog.d("start unziping file " + zipFilePath);
            unzipFile(zipFilePath);
        }
        try{
            if(shouldUnzip && isNativeDownload){
                String tempPath = zipFilePath+"folder";
                PreferenceManager.getDefaultSharedPreferences(HSApplication.getContext()).edit().putString("deepLinkThemeTempPath",tempPath).commit();
                //moveFileOrDirectory(new File(zipFilePath+"folder"), destFile);
            }else {
                File destFile = new File(savePath);
                if (!destFile.isDirectory() && destFile.exists()){
                    deleteRecursive(destFile);
                }
                HSLog.d("start copying file " + zipFilePath + " to "+savePath);
                moveFileOrDirectory(new File(zipFilePath), destFile);
            }
        }catch (IOException e) {
            e.printStackTrace();
            return false;
        }

        if(!isNativeDownload){
            File downloadedFile = new File(zipFilePath);
            File downloadedFolder = new File(zipFilePath+"folder");
            if (downloadedFile.exists()){
                deleteRecursive(downloadedFile);
            }
            if (downloadedFolder.exists()){
                deleteRecursive(downloadedFolder);
            }
        }
        return true;
    }


    private void moveFileOrDirectory(File sourceLocation, File targetLocation)
            throws IOException {

        File parent = targetLocation.getParentFile();
        if (!parent.exists()) {
            parent.mkdirs();
        }

        if (sourceLocation.isDirectory()) {
            if (!targetLocation.exists()) {
                targetLocation.mkdir();
            }

            String[] children = sourceLocation.list();
            for (int i = 0; i < sourceLocation.listFiles().length; i++) {

                moveFileOrDirectory(new File(sourceLocation, children[i]),
                        new File(targetLocation, children[i]));
            }
        } else {

            InputStream in = new FileInputStream(sourceLocation);

            OutputStream out = new FileOutputStream(targetLocation);

            // Copy the bits from instream to outstream
            byte[] buf = new byte[1024];
            int len;
            while ((len = in.read(buf)) > 0) {
                out.write(buf, 0, len);
            }
            in.close();
            out.close();
        }

    }

    private void deleteRecursive(File fileOrDirectory) {

        if (fileOrDirectory.isDirectory()) {
            for (File child : fileOrDirectory.listFiles()) {
                deleteRecursive(child);
            }
        }

        fileOrDirectory.delete();
    }

    private boolean unzipFile( String fileName)
    {
        String folderName = fileName+"folder/";
        File downloadedFileFolder = new File(folderName);
        if (!downloadedFileFolder.exists()){
            downloadedFileFolder.mkdir();
        }
        InputStream is;
        ZipInputStream zis;
        try
        {
            String filename;
            is = new FileInputStream(fileName);
            zis = new ZipInputStream(new BufferedInputStream(is));
            ZipEntry ze;
            byte[] buffer = new byte[1024];
            int count;

            while ((ze = zis.getNextEntry()) != null)
            {
                // zapis do souboru
                filename = ze.getName();

                // Need to create directories if not exists, or
                // it will generate an Exception...
                if (ze.isDirectory()) {
                    File fmd = new File(folderName+"/"+filename);
                    fmd.mkdirs();
                    continue;
                }

                FileOutputStream fout = new FileOutputStream(folderName+"/"+filename);

                // cteni zipu a zapis
                while ((count = zis.read(buffer)) != -1)
                {
                    fout.write(buffer, 0, count);
                }

                fout.close();
                zis.closeEntry();
            }

            zis.close();
        }
        catch(IOException e)
        {
            File downloadedFile = new File(fileName);
            if (downloadedFile.exists()){
                deleteRecursive(downloadedFile);
            }
            e.printStackTrace();
            return false;
        }

        return true;
    }

    private void onDeeplinkThemeDownloadSuccess() {
        String savePath = PreferenceManager.getDefaultSharedPreferences(HSApplication.getContext()).getString("deepLinkThemeSavePath","");
        String tempPath = PreferenceManager.getDefaultSharedPreferences(HSApplication.getContext()).getString("deepLinkThemeTempPath","");
        if(TextUtils.isEmpty(savePath) || TextUtils.isEmpty(tempPath)){
            return;
        }
        try{
            moveFileOrDirectory(new File(tempPath),new File(savePath));
        }catch (IOException e) {
            e.printStackTrace();
            return;
        }
        String deeplinkTheme = PreferenceManager.getDefaultSharedPreferences(HSApplication.getContext()).getString("deepLinkThemeName","");
        String expr = "require('DeepLinkManager').shared.onDeeplinkThemeReceived('"+deeplinkTheme+"')";
        NativeAPI.sharedInstance().callJS(expr);
    }
}
