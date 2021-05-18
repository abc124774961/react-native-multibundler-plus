package com.bindo.rn.framework;

import android.app.ActivityManager;
import android.app.ActivityManager.MemoryInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.view.WindowManager;

import com.facebook.react.AsyncReactActivity;
import com.facebook.react.LoadScriptListener;
import com.facebook.react.ReactApplication;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.reactnative_multibundler.BundleUtils.RnBundle;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class SystemModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext;

    @Override
    public String getName() {
        return "SystemModule";
    }

    public SystemModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("versionName", "not available");
        constants.put("versionCode", 0);
        try {
            PackageManager pm = mContext.getPackageManager();
            PackageInfo pi = pm.getPackageInfo(mContext.getPackageName(), 0);
            constants.put("versionName", pi.versionName);
            constants.put("versionCode", pi.versionCode);

        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        return constants;
    }


    @ReactMethod
    public void getAvailMemory(Promise promise) {
        ActivityManager am = (ActivityManager) mContext.getSystemService(mContext.ACTIVITY_SERVICE);
        MemoryInfo mi = new MemoryInfo();
        am.getMemoryInfo(mi);
//        String availMem = Formatter.formatFileSize(reactContext.getBaseContext(), mi.availMem);
        promise.resolve((int) mi.availMem);
    }




    /**
     * 执行cmd
     */
    @ReactMethod
    public void exectuCMD(String cmd) {
        Runtime mRuntime = Runtime.getRuntime();
        try {
            //Process中封装了返回的结果和执行错误的结果
            Process mProcess = mRuntime.exec(cmd);
            BufferedReader mReader = new BufferedReader(new InputStreamReader(mProcess.getInputStream()));
            StringBuffer mRespBuff = new StringBuffer();
            char[] buff = new char[1024];
            int ch = 0;
            while ((ch = mReader.read(buff)) != -1) {
                mRespBuff.append(buff, 0, ch);
            }
            mReader.close();
            System.out.print("systemModule - exectuCMD" + mRespBuff.toString());
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }


    @ReactMethod
    public void exitApp() {
        getCurrentActivity().finish();
        android.os.Process.killProcess(android.os.Process.myPid()); // 杀死进程
    }

    /**
     * 重启设备
     */
    @ReactMethod
    public void rebootDevice() {
        exectuCMD("su -c reboot\n");
    }

    /**
     * 启用软键盘
     */
    @ReactMethod
    public void enableSoftKeyboard() {
        mContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                if (getCurrentActivity() != null) {
                    getCurrentActivity().getWindow().clearFlags(WindowManager.LayoutParams.FLAG_ALT_FOCUSABLE_IM);
                }
            }
        });
    }

    /**
     * 禁用软键盘
     */
    @ReactMethod
    public void disableSoftKeyboard() {
        mContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                if (getCurrentActivity() != null) {
                    getCurrentActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_ALT_FOCUSABLE_IM);
                }
            }
        });
    }

    @ReactMethod
    public void openDeveloperDialog() {
        // 有些垃圾机器比如A930无法弹出ReactNative的菜单
        ReactApplication reactApplication = (ReactApplication) getCurrentActivity().getApplication();
        reactApplication.getReactNativeHost().getReactInstanceManager().getDevSupportManager().showDevOptionsDialog();
    }
}
