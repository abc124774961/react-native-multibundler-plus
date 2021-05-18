package com.bindo.utils;

import android.app.Activity;

import com.facebook.react.ReactApplication;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.devsupport.interfaces.DevSupportManager;
import com.facebook.react.devsupport.interfaces.PackagerStatusCallback;
import com.reactnative_multibundler.BuildConfig;

public class DebugUtil {


    public static void openRNDebugMenu(Activity activity, boolean isCheckPackagerIsRunning) {
        if (BuildConfig.DEBUG) {
            ReactApplication reactApplication = (ReactApplication) activity.getApplicationContext();
            DevSupportManager devSupportManager = reactApplication.getReactNativeHost().getReactInstanceManager().getDevSupportManager();
            devSupportManager.isPackagerRunning(new PackagerStatusCallback() {
                @Override
                public void onPackagerStatusFetched(boolean packagerIsRunning) {
                    if (!packagerIsRunning || isCheckPackagerIsRunning == false) {
                        activity.runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                devSupportManager.setDevSupportEnabled(true);
                                devSupportManager.showDevOptionsDialog();
                            }
                        });
                    }
                }
            });
        }
    }
}
