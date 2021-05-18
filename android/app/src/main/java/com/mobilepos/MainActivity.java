package com.mobilepos;

import android.os.Bundle;

import androidx.annotation.Nullable;

import com.bindo.utils.AssetsFIle;
import com.bindo.utils.DebugUtil;
import com.facebook.react.AsyncReactActivity;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.mobilepos.BundleUtils.RnBundle;

import org.devio.rn.splashscreen.SplashScreen;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MobilePos";
  }

  public static class MainActivity extends AsyncReactActivity {

      public MainActivity() {
          SplashScreen.show(this, R.style.SplashScreenTheme);  // here
      }

      @Override
      protected void onCreate(@Nullable Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
  //    setContentView(R.layout.main_act_loadbundle);
          ReactInstanceManager reactInstanceManager = ((ReactApplication) getApplication()).getReactNativeHost().getReactInstanceManager();
          if (!reactInstanceManager.hasStartedCreatingInitialContext()) {
              reactInstanceManager.createReactContextInBackground();//这里会先加载基础包platform.android.bundle，也可以不加载
          }
          //事先加载基础包可以减少后面页面加载的时间，但相应的会增加内存使用
          // 当然也可以不用事先加载基础包，AsyncReactActivity中已经包含了这个逻辑，如果判断出没加载基础包会先加载基础包再加载业务包
          //请根据自己的需求使用
  //    findViewById(R.id.btn_go_buz1).setOnClickListener(new View.OnClickListener() {
  //      @Override
  //      public void onClick(View v) {//点击进入rn业务1
  //        startActivity(new Intent(MainActivity.this, Buz1Activity.class));
  //      }
  //    });
  //    findViewById(R.id.btn_go_buz2).setOnClickListener(new View.OnClickListener() {
  //      @Override
  //      public void onClick(View v) {//点击进入rn业务2
  //        startActivity(new Intent(MainActivity.this, Buz2Activity.class));
  //      }
  //    });
  //    findViewById(R.id.btn_go_buz3).setOnClickListener(new View.OnClickListener() {
  //      @Override
  //      public void onClick(View v) {//点击进入rn业务3
  //        startActivity(new Intent(MainActivity.this, Buz3Activity.class));
  //      }
  //    });
      }

      String entryModuleName = null;

      @Override
      protected RnBundle getBundle() {
          //获取入口模块名称
          String content = AssetsFIle.getFromAssets(this, "platform.android.bundle");
          Pattern pattern = Pattern.compile("\"entryModule\":[ ]*\"([a-zA-Z_-]*)\"");
          Matcher matcher = pattern.matcher(content);
          if (matcher.find()) {
              entryModuleName = matcher.group(1);
              RnBundle bundle = new RnBundle();
              bundle.scriptType = ScriptType.ASSET;
              bundle.scriptPath = entryModuleName + ".android.bundle";
              bundle.scriptUrl = entryModuleName + ".android.bundle";
              return bundle;
          } else
              return null;
      }

      /**
       * Returns the name of the main component registered from JavaScript. This is used to schedule
       * rendering of the component.
       */
      @Override
      protected String getMainComponentName() {
          return entryModuleName;
      }


      @Override
      public void onWindowFocusChanged(boolean hasFocus) {
          super.onWindowFocusChanged(hasFocus);
          if (hasFocus) {
              DebugUtil.openRNDebugMenu(this, true);
          }
      }

      @Override
      protected void onResume() {
          super.onResume();
          DebugUtil.openRNDebugMenu(this, true);
      }
  }
}
