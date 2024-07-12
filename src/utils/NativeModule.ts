import { NativeModules } from 'react-native';

export const NativeFunction = {
  checkDeviceModel: NativeModules.NativeMethods.checkDeviceModel,
  checkRam: NativeModules.NativeMethods.checkRam,
  setThreshold: NativeModules.NativeMethods.setThreshold,
  // startMonitoring: NativeModules.TurboModules.startMonitoring,
  // stopMonitoring: NativeModules.TurboModules.stopMonitoring,
};
