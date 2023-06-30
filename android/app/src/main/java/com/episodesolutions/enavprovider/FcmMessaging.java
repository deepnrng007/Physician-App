package com.episodesolutions.enavprovider;

import static android.app.Notification.DEFAULT_SOUND;

import android.content.SharedPreferences;
import android.util.Log;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import android.os.Build;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import java.util.Date;
import java.util.Map;
import android.content.Intent;
import android.app.PendingIntent;
import android.app.Notification;
import androidx.core.app.NotificationCompat;
import android.graphics.Color;
import android.webkit.URLUtil;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class FcmMessaging extends FirebaseMessagingService {

    private final static String TAG = "FCM Logs::::";
    private final static String CHANNEL_ID = "ENAVPROVIDERNOTIFICATION";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        try {
            Map<String, String> params = remoteMessage.getData();
            String actionType = params.get("actionType");
            String actionEntityId = params.get("actionEntityId");
            String dateInsertedTimeStamp = params.get("dateInsertedTimeStamp");
            SharedPreferences preferences = EncriptedStorageEditor.getEncryptedEditor(this.getApplicationContext());
            String localConversationID = preferences.getString(Enums.CONVERSATION_ID_KEY, "");
            String astChatVisitTimeStamps = preferences.getString(Enums.LASTCHATSCREENVISIT, "");
            Log.d(TAG,"Conversation ID: "+remoteMessage.getData().toString()+localConversationID);
            MainApplication application = (MainApplication) this.getApplication();
            ReactNativeHost reactNativeHost = application.getReactNativeHost();
            ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
            ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
            if(AppState.getState()) {
                if (actionType.equals(Enums.NEW_MESSAGE)) {
                    if(!localConversationID.equals(actionEntityId)) {
                        if (astChatVisitTimeStamps.equals("")) {
                            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                    .emit("getAllConversations", "event triggered");
                            createNotificationChannel(remoteMessage.getData());

                        } else {
                            JSONArray array = Utils.convertStringToJsonArray(astChatVisitTimeStamps);
                            if (array != null) {
                                JSONObject item = Utils.findIndexOf("convoID", actionEntityId, array);
                                if (item != null) {
                                    String lastVisitTime = item.getString("lastVisitTime");
                                    Date notify = Utils.convertStringToDate(dateInsertedTimeStamp);
                                    Date visitTime = Utils.convertStringToDate(lastVisitTime);
                                    if (notify.compareTo(visitTime) > 0) {
                                        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                                .emit("getAllConversations", "event triggered");
                                        createNotificationChannel(remoteMessage.getData());
                                    }
                                }else{
                                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                            .emit("getAllConversations", "event triggered");
                                    createNotificationChannel(remoteMessage.getData());
                                }
                            }
                        }
                    }
                } else if (actionType.equals(Enums.NEW_TOC)) {
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("getTocListEvent", "event triggered");
                    createNotificationChannel(remoteMessage.getData());
                } else if (actionType.equals(Enums.PATIENT_OFFTRACK)) {
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("getEpisodeListEvent", "event triggered");
                    createNotificationChannel(remoteMessage.getData());
                }
            }else createNotificationChannel(remoteMessage.getData()); // createNotificationChannel(title, body, json.toString(2),actionEntityId);
        } catch (Exception e) {
            Log.i(TAG, "error is " + e);
        }
    }



    @Override
    public void onNewToken(String s) {
        super.onNewToken(s);
        Log.d(TAG, "FCM Token received: " + s);
        SharedPreferences preferences = EncriptedStorageEditor.getEncryptedEditor(this.getApplicationContext());
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString("FCM_TOKEN_KEY", s);
        editor.apply();
    }

    private void createNotificationChannel(Map<String, String> params) throws JSONException {
        String title = params.get("title");
        String body = params.get("body");
        String actionType = params.get("actionType");
        String actionEntityId = params.get("actionEntityId");
        JSONObject json = new JSONObject(params);
        Intent notificationIntent = new Intent(this, MainActivity.class);
        Log.d(TAG,"paramsparams data: "+params);
        notificationIntent.putExtra("notificationPayload", json.toString(2));
        notificationIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent contentIntent = PendingIntent.getActivity(this, (int) System.currentTimeMillis(), notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        NotificationManager manager = getSystemService(NotificationManager.class);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel serviceChannel = new NotificationChannel(CHANNEL_ID, "Foreground Service Channel",
                    NotificationManager.IMPORTANCE_HIGH);
            manager.createNotificationChannel(serviceChannel);
        }
        boolean valid = URLUtil.isValidUrl(body);
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle(title)
                .setContentText(valid ? "Attachment" : body)
                .setAutoCancel(true)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setDefaults(Notification.DEFAULT_ALL)
                .setPriority(Notification.PRIORITY_HIGH)
                .setContentIntent(contentIntent)
                .setColor(Color.WHITE)
                .setVibrate(new long[] { 100, 200, 300, 400, 500, 400, 300, 200, 400 })
                .build();
        int id;
        try{
            if(actionType.equals(Enums.NEW_MESSAGE)) id = (int) System.currentTimeMillis();
            else id= Integer.parseInt(actionEntityId);
        }catch (NumberFormatException e){
            id =1;
        }
        manager.notify(id, notification);
    }
}