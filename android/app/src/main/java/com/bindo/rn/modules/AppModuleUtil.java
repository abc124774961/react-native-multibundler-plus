package com.bindo.rn.modules;

import androidx.annotation.NonNull;

import com.facebook.react.AsyncReactActivity;
import com.facebook.react.LoadScriptListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.mobilepos.BundleUtils.RnBundle;

import java.util.HashMap;

public class AppModuleUtil extends ReactContextBaseJavaModule {


    ReactApplicationContext mContext;
    HashMap hashMap = new HashMap();

    public AppModuleUtil(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }


    @ReactMethod
    public void loadAssetModule(String name, Promise promise) {
        if (!hashMap.containsKey(name)) {
            AsyncReactActivity activity = (AsyncReactActivity) mContext.getCurrentActivity();
            RnBundle bundle = new RnBundle();
            bundle.scriptType = AsyncReactActivity.ScriptType.ASSET;
            bundle.scriptPath = name + ".android.bundle";
            bundle.scriptUrl = name + ".android.bundle";
            activity.loadScript(new LoadScriptListener() {
                @Override
                public void onLoadComplete(boolean success, String scriptPath) {
                    if (success) {
                        hashMap.put(name, true);
                        promise.resolve("");
                    } else {
                        promise.reject("", "");

                    }
                }
            }, bundle);
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "AppModuleUtil";
    }
}
