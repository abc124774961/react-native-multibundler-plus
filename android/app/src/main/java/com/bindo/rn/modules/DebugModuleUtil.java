package com.bindo.rn.modules;

import android.app.Activity;

import androidx.annotation.NonNull;

import com.bindo.utils.DebugUtil;
import com.facebook.react.AsyncReactActivity;
import com.facebook.react.LoadScriptListener;
import com.facebook.react.ReactApplication;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.devsupport.interfaces.DevSupportManager;
import com.facebook.react.devsupport.interfaces.PackagerStatusCallback;
import com.reactnative_multibundler.BuildConfig;
import com.reactnative_multibundler.BundleUtils.RnBundle;

import java.util.HashMap;

public class DebugModuleUtil extends ReactContextBaseJavaModule {


    ReactApplicationContext mContext;
    HashMap hashMap = new HashMap();

    public DebugModuleUtil(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }


    @ReactMethod
    public void openRNDebugMenu() {
        DebugUtil.openRNDebugMenu(this.getCurrentActivity(), false);
    }

    @NonNull
    @Override
    public String getName() {
        return "DebugModuleUtil";
    }
}
