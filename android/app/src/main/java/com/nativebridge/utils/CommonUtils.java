package com.nativebridge.utils;

import static androidx.core.content.ContextCompat.getSystemService;

import android.app.ActivityManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.res.Resources;
import android.util.Log;
import android.os.Debug;

import androidx.core.app.NotificationCompat;

import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.stdapp.R;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.RandomAccessFile;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class CommonUtils {
        public static String PACKAGE_NAME = "com.stdapp";
    public static int totalMemory = 0; // in MB
    public static int availableMemory = 0; // in MB
    public static  float usedMemory=0;
    public static float threshold=1L;
    //    public static String PACKAGE_NAME = "com.hoolva.android";com.stdapp
    public static WritableArray getAppCpuUsage(Context context) throws PackageManager.NameNotFoundException {
//        ActivityManager activityManager = (ActivityManager) getSystemService(context,Object.class);
        return getRunningAppProcessInfo(context);
//        if (runningAppProcessInfo != null) {
//            int pid = runningAppProcessInfo.pid;
//            String[] cmd = {
//                    "/system/bin/top", "-n", "1", "-p", String.valueOf(pid)
//            };
//
//            try {
//                Process process = Runtime.getRuntime().exec(cmd);
//                BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
//                String line;
//                while ((line = reader.readLine()) != null) {
//                    if (line.contains(PACKAGE_NAME)) {
//                        Log.d("TAG", "CPU Usage of " + "PACKAGE_NAME" + ": " + line);
//                        break;
//                    }
//                }
//                reader.close();
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        } else {
//            Log.e("TAG", "App not running");
//        }
    }

    private static WritableArray getRunningAppProcessInfo(Context context) throws PackageManager.NameNotFoundException {
        ActivityManager activityManager = getSystemService(context,ActivityManager.class);
        WritableNativeArray runningAppProcesses = new WritableNativeArray();
        PackageManager pm = context.getPackageManager();
        List<ApplicationInfo> packages = pm.getInstalledApplications(0);
//        Resources appInfo = pm.getResourcesForApplication("com.android.providers.calendar");
//        List<ActivityManager.RunningTaskInfo> runningAppProcessInfoList = activityManager.getRunningTasks(10);
        for (ApplicationInfo appProcessInfo : packages) {
            WritableMap info=new WritableNativeMap();
            info.putString("processName",appProcessInfo.processName);
            info.putInt("pid",appProcessInfo.uid);
            Debug.MemoryInfo[] memoryInfos = activityManager.getProcessMemoryInfo(new int[]{android.os.Process.myPid()});
            long totalPss = 0;
            for (Debug.MemoryInfo memoryInfo : memoryInfos) {
                totalPss += memoryInfo.getTotalPss();
            }
            info.putDouble("mem", (double) totalPss / 1024L);
            runningAppProcesses.pushMap(info);
//            if (appProcessInfo.processName.equals(PACKAGE_NAME)) {
//                return appProcessInfo;
        }
//        }

        return runningAppProcesses;
    }
    public static double getCurrentAppRamUsage(Context context){
        ActivityManager activityManager = getSystemService(context,ActivityManager.class);
        assert activityManager != null;
        Debug.MemoryInfo[] memory_infos = activityManager.getProcessMemoryInfo(new int[]{android.os.Process.myPid()});
        long totalPss = 0;
        for (Debug.MemoryInfo memoryInfo : memory_infos) {
            totalPss += memoryInfo.getTotalPss();
        }
        return (double) totalPss /1024L;
    }

    public static float getCurrentAppCpuUsage() {
        int pid = android.os.Process.myPid();
        float cpuUsage = 0f;

        try {
            // Read the current CPU usage for the process
            String[] cpuStat1 = getCpuStat(pid);
            Thread.sleep(360); // Sleep for a short period to calculate the difference
            String[] cpuStat2 = getCpuStat(pid);

            // Calculate the CPU usage
            if (cpuStat1 != null && cpuStat2 != null) {
                long totalTime1 = Long.parseLong(cpuStat1[13]) + Long.parseLong(cpuStat1[14]);
                long totalTime2 = Long.parseLong(cpuStat2[13]) + Long.parseLong(cpuStat2[14]);
                long totalCpuTime1 = getTotalCpuTime();
                long totalCpuTime2 = getTotalCpuTime();

                if (totalCpuTime2 > totalCpuTime1 && totalTime2 > totalTime1) {
                    cpuUsage = (float)(totalTime2 - totalTime1) / (totalCpuTime2 - totalCpuTime1);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return cpuUsage;
    }

    private static String[] getCpuStat(int pid) {
        try {
            RandomAccessFile reader = new RandomAccessFile("/proc/" + pid + "/stat", "r");
            String load = reader.readLine();
            reader.close();
            return load.split(" ");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private static long getTotalCpuTime() {
        try {
            RandomAccessFile reader = new RandomAccessFile("/proc/stat", "r");
            String load = reader.readLine();
            reader.close();
            String[] toks = load.split(" ");
            return Long.parseLong(toks[2]) + Long.parseLong(toks[3]) + Long.parseLong(toks[4]) + Long.parseLong(toks[5]) + Long.parseLong(toks[6]) + Long.parseLong(toks[7]) + Long.parseLong(toks[8]);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return 0;
    }
    public static List<Number> monitorRamUsage(Context context) {
        ActivityManager activityManager = getSystemService(context,ActivityManager.class);
        ActivityManager.MemoryInfo memoryInfo = new ActivityManager.MemoryInfo();
        assert activityManager != null;
        activityManager.getMemoryInfo(memoryInfo);

        totalMemory = (int) (memoryInfo.totalMem / 1024 / 1024); // in MB
        usedMemory = totalMemory - availableMemory;
        availableMemory = (int) (memoryInfo.availMem / 1024 / 1024); // in MB
        List<Number> list = new ArrayList<>();
        list.add(totalMemory);
        list.add(usedMemory);
        list.add(availableMemory);

//        Log.d("TAG", "Total Memory: " + totalMemory + " MB");
//        Log.d("TAG", "Available Memory: " + availableMemory + " MB");
//        Log.d("TAG", "Used Memory: " + usedMemory + " MB");

        if (usedMemory > (totalMemory * threshold)) { // If used memory exceeds threshold of total memory
            // Trigger an alert
            showRamUsageAlert(usedMemory, totalMemory,context);
        }
        return list;
    }

    public static void setThreshold(int val,String type){

        if (Objects.equals(type, "MB")){
            threshold= (float) val /totalMemory;
            Log.d("valMB", String.valueOf(threshold));
        }else{
            threshold= (long) val;
            Log.d("val", String.valueOf(threshold));
        }
    }

    private static void showRamUsageAlert(float usedMemory, long totalMemory, Context context) {
        String CHANNEL_ID = "RAM_USAGE_ALERT_CHANNEL";
        String channelName = "RAM Usage Alert";

        NotificationManager notificationManager = (NotificationManager) getSystemService(context,NotificationManager.class);
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, channelName, NotificationManager.IMPORTANCE_HIGH);
            channel.setSound(null, null);  // No sound
            channel.enableVibration(false);
            assert notificationManager != null;
            notificationManager.createNotificationChannel(channel);
        }

        Notification notification = new NotificationCompat.Builder(context,CHANNEL_ID)
                .setContentTitle("RAM Usage Alert")
                .setContentText("Used RAM: " + usedMemory + " MB / " + totalMemory + " MB")
                .setSmallIcon(R.drawable.rn_edit_text_material)
                .build();
        assert notificationManager != null;
        notificationManager.notify(1, notification);
    }


    public static double getCpuUsage(Context context) {
        ActivityManager activityManager = getSystemService(context,ActivityManager.class);
        ActivityManager.MemoryInfo memoryInfo = new ActivityManager.MemoryInfo();
        assert activityManager != null;
        activityManager.getMemoryInfo(memoryInfo);
        List<ActivityManager.RunningAppProcessInfo> runningAppProcessInfoList = activityManager.getRunningAppProcesses();

        int[] pids = new int[1000];
        for (int i=0;i<runningAppProcessInfoList.size(); i++) {
            pids[i]=runningAppProcessInfoList.get(i).pid;
        }

        Debug.MemoryInfo[] memoryInfoArray = activityManager.getProcessMemoryInfo(pids);
        Debug.MemoryInfo pidMemoryInfo = memoryInfoArray[0];

        long totalPss = pidMemoryInfo.getTotalPss() * 1024L;  // Total PSS in bytes
        Log.d("qqqqqq",String.valueOf(totalPss));
        long totalRam = memoryInfo.totalMem;

        return (double) totalPss / (double) totalRam;
    }
}
