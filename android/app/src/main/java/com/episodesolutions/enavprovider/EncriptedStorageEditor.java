package com.episodesolutions.enavprovider;


import android.content.Context;
import android.content.SharedPreferences;

import androidx.security.crypto.EncryptedSharedPreferences;
import androidx.security.crypto.MasterKeys;

import java.io.IOException;
import java.security.GeneralSecurityException;

public class EncriptedStorageEditor {
    public static SharedPreferences getEncryptedEditor(Context context){
        SharedPreferences sharedPreferences=null;
         try {
          String masterKeyAlias = MasterKeys.getOrCreate(MasterKeys.AES256_GCM_SPEC);
          sharedPreferences = EncryptedSharedPreferences.create(
                  "RN_ENCRYPTED_STORAGE_SHARED_PREF",
                  masterKeyAlias,
                  context,
                  EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                  EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
          );
      } catch (GeneralSecurityException e) {
          e.printStackTrace();
      } catch (IOException e) {
          e.printStackTrace();
      }
        return sharedPreferences;
    }
}
