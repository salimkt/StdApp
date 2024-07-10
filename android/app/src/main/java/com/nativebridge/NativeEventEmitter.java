package com.nativebridge;


import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class NativeEventEmitter {
    private final ReactApplicationContext reactContext;

    public NativeEventEmitter(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    public void sendReactNativeEvent(String eventName, String message) {
        WritableMap params = Arguments.createMap();
        params.putString("message", message);

        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}



