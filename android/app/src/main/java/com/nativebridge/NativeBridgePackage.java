package com.nativebridge;

import android.os.Looper;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class NativeBridgePackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        Looper.prepare();
        NativeEventEmitter eventEmitter = new NativeEventEmitter(reactContext);
        List<NativeModule> modules = new ArrayList<>();
        modules.add((NativeModule) new NativeMethods(reactContext, eventEmitter));
        return modules;
    }

    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
//        return Collections.<ViewManager>singletonList(new FprintManager(reactContext));
       return Collections.emptyList();
    }
}

