package com.episodesolutions.enavprovider;

import android.icu.text.Edits;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Utils {
    public static JSONArray convertStringToJsonArray(String jsonStr){
        try {
            JSONArray array = new JSONArray(jsonStr);
            return array;
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static JSONObject findIndexOf(String key,String search, JSONArray array){
        if(array!=null){
            for(int i=0;i<array.length();i++){
                try{
                    JSONObject obj = array.getJSONObject(i);
                    String value = obj.getString(key);
                    if(value.equals(search)){
                        return obj;
                    }else continue;
                }catch (Exception e){
                    e.printStackTrace();
                    return null;
                }
            }
        }
        return null;
    }

    public static Date convertStringToDate(String sDate){
        try {
            DateFormat utcFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            Date date = utcFormat.parse(sDate);
            return date;
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }
}
