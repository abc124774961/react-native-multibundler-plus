package com.mobilepos;

import android.app.Application;
import android.content.Context;

import com.bindo.rn.modules.AppModuleUtilPackage;
import com.bindo.rn.modules.DebugModuleUtilPackage;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.mobilepos.BundleUtils.ScriptLoadUtil;

import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost =
            new ReactNativeHost(this) {
                @Override
                public boolean getUseDeveloperSupport() {
                    return ScriptLoadUtil.MULTI_DEBUG;//是否是debug模式

                }

                @Override
                protected List<ReactPackage> getPackages() {
                    @SuppressWarnings("UnnecessaryLocalVariable")
                    List<ReactPackage> packages = new PackageList(this).getPackages();
                    // Packages that cannot be autolinked yet can be added manually here, for example:
                    //                    packages.add(new AppModuleUtilPackage());
                    //                    packages.add(new DebugModuleUtilPackage());
                    //                    packages.addAll(new ArrayList<ReactPackage>().add{ new AppModuleUtilPackage(),new DebugUtilPackage()});
                    packages.addAll(Arrays.asList(
                            new AppModuleUtilPackage(),
                            new DebugModuleUtilPackage()
                    ));
                    return packages;
                }

                @Nullable
                @Override
                protected String getBundleAssetName() {
                    return "platform.android.bundle";
                }

                //          MultiDenugEntry
                @Override
                protected String getJSMainModuleName() {
                    return "MultiDenugEntry";
                }
            };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        initializeFlipper(this); // Remove this line if you don't want Flipper enabled
    }

    /**
     * Loads Flipper in React Native templates.
     *
     * @param context
     */
    private static void initializeFlipper(Context context) {
        if (BuildConfig.DEBUG) {
            try {
            /*
             We use reflection here to pick up the class that initializes Flipper,
            since Flipper library is not available in release mode
            */
                Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
                aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }
}

