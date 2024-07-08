import { NativeModules } from "react-native";

export const NativeFunction={
    startMonitoring:NativeModules.TurboModules?.startMonitoring,
    stopMonitoring:NativeModules.TurboModules?.stopMonitoring,
}