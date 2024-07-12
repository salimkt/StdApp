package com.nativebridge;

import static androidx.core.content.ContextCompat.getSystemService;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.NotificationChannel;
import androidx.core.app.NotificationCompat;
import android.content.Context;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.nativebridge.utils.CommonUtils;
import com.stdapp.R;

import androidx.annotation.NonNull;

import java.util.List;

public class NativeMethods extends ReactContextBaseJavaModule {
    Context mContext;
    NativeEventEmitter  meventEmitter;
    NativeMethods(ReactApplicationContext context, NativeEventEmitter eventEmitter) {
        super();
        mContext = context;
        meventEmitter = eventEmitter;
    }

    @NonNull
    @Override
    public String getName() {
        return "NativeMethods";
    }

    @ReactMethod
    public void checkDeviceModel(Promise promise){
        CommonUtils.getAppCpuUsage(mContext);
        promise.resolve(false);
    }
    @ReactMethod
    public void checkRam(Promise promise) {
        promise.resolve(CommonUtils.monitorRamUsage(mContext).toString());
    }

    @ReactMethod
    public void setThreshold(String val,String type) {
        CommonUtils.setThreshold(Integer.parseInt(val),type);
    }
}
