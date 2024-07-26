import {NativeModules} from 'react-native';

export const NativeFunction = {
  checkRam: NativeModules.NativeMethods.checkRam,
  setThreshold: NativeModules.NativeMethods.setThreshold,
  checkCpu: NativeModules.NativeMethods.checkCpu,
  currentAppRamUsage: NativeModules.NativeMethods.currentAppRamUsage,
  currentAppProcessorUsage:
    NativeModules.NativeMethods.currentAppProcessorUsage,
  // startMonitoring: NativeModules.TurboModules.startMonitoring,
  // stopMonitoring: NativeModules.TurboModules.stopMonitoring,
};
