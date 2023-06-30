package com.episodesolutions.enavprovider;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  @Override
  public void onDestroy() {
    super.onDestroy();
    AppState.setState(false);
    Log.d("activity","activity destroye");
    SharedPreferences preferences = EncriptedStorageEditor.getEncryptedEditor(this.getApplicationContext());
    SharedPreferences.Editor editor = preferences.edit();
    editor.remove("CONVERSATION_ID_KEY");
    editor.commit();
  }

  @Override
  public void onCreate(Bundle savedInstanceState)
  {
    AppState.setState(true);
    super.onCreate(savedInstanceState);
    Bundle extras = getIntent().getExtras();
    if(extras!=null) {
      if (extras.containsKey("notificationPayload")) {
        String notificationPayload = extras.getString("notificationPayload");
        SharedPreferences preferences = EncriptedStorageEditor.getEncryptedEditor(this.getApplicationContext());
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString(Enums.NOTIFICATION_PAYLOAD,notificationPayload);
        editor.commit();
      }
    }
  }


  @Override
  public void onNewIntent(Intent intent){
    Bundle extras = intent.getExtras();
    if(extras!=null){
      if(extras.containsKey("notificationPayload")){
        try{
          String data = extras.getString("notificationPayload");
          MainApplication application = (MainApplication) this.getApplication();
          ReactNativeHost reactNativeHost = application.getReactNativeHost();
          ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
          ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
          reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                  .emit("onClickNotificationEvent", data);
        }catch (Exception e) {
          e.printStackTrace();
        }
      }

    }
  }

  @Override
  protected String getMainComponentName() {
    return "physicianAppProvider";
  }
}
