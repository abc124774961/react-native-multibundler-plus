package com.bindo.rn.modules;

import androidx.annotation.NonNull;

import com.bindo.utils.DebugUtil;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

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
