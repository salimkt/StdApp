package com.nativebridge.utils;

import static androidx.core.content.ContextCompat.getSystemService;

import android.app.ActivityManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.stdapp.R;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class CommonUtils {
        public static String PACKAGE_NAME = "com.stdapp";
//    public static String PACKAGE_NAME = "com.hoolva.android";com.stdapp
    public static void getAppCpuUsage(Context context) {
//        ActivityManager activityManager = (ActivityManager) getSystemService(context,Object.class);
        ActivityManager.RunningAppProcessInfo runningAppProcessInfo = getRunningAppProcessInfo(context);
        if (runningAppProcessInfo != null) {
            int pid = runningAppProcessInfo.pid;
            String[] cmd = {
                    "/system/bin/top", "-n", "1", "-p", String.valueOf(pid)
            };

            try {
                Process process = Runtime.getRuntime().exec(cmd);
                BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
                String line;
                while ((line = reader.readLine()) != null) {
                    if (line.contains(PACKAGE_NAME)) {
                        Log.d("TAG", "CPU Usage of " + "PACKAGE_NAME" + ": " + line);
                        break;
                    }
                }
                reader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            Log.e("TAG", "App not running");
        }
    }

    public static ActivityManager.RunningAppProcessInfo getRunningAppProcessInfo(Context context) {
        ActivityManager activityManager = getSystemService(context,ActivityManager.class);
        List<ActivityManager.RunningAppProcessInfo> runningAppProcessInfoList = activityManager.getRunningAppProcesses();
        for (ActivityManager.RunningAppProcessInfo appProcessInfo : runningAppProcessInfoList) {
            if (appProcessInfo.processName.equals(PACKAGE_NAME)) {
                return appProcessInfo;
            }
        }
        return null;
    }

    public static List<Long> monitorRamUsage(Context context) {
        ActivityManager activityManager = getSystemService(context,ActivityManager.class);
        ActivityManager.MemoryInfo memoryInfo = new ActivityManager.MemoryInfo();
        activityManager.getMemoryInfo(memoryInfo);

        Long totalMemory = memoryInfo.totalMem / 1024 / 1024; // in MB
        Long availableMemory = memoryInfo.availMem / 1024 / 1024; // in MB
        Long usedMemory = totalMemory - availableMemory;
        List<Long> list = new ArrayList<>();
        list.add(totalMemory);
        list.add(usedMemory);
        list.add(availableMemory);

        Log.d("TAG", "Total Memory: " + totalMemory + " MB");
        Log.d("TAG", "Available Memory: " + availableMemory + " MB");
        Log.d("TAG", "Used Memory: " + usedMemory + " MB");

        if (usedMemory > (totalMemory * 0.5)) { // If used memory exceeds 80% of total memory
            // Trigger an alert
            showRamUsageAlert(usedMemory, totalMemory,context);
        }
        return list;
    }

    private static void showRamUsageAlert(long usedMemory, long totalMemory, Context context) {
        String CHANNEL_ID = "RAM_USAGE_ALERT_CHANNEL";
        String channelName = "RAM Usage Alert";

        NotificationManager notificationManager = (NotificationManager) getSystemService(context,NotificationManager.class);
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, channelName, NotificationManager.IMPORTANCE_HIGH);
            notificationManager.createNotificationChannel(channel);
        }

        Notification notification = new NotificationCompat.Builder(context,CHANNEL_ID)
                .setContentTitle("RAM Usage Alert")
                .setContentText("Used RAM: " + usedMemory + " MB / " + totalMemory + " MB")
                .setSmallIcon(R.drawable.rn_edit_text_material)
                .setVibrate(null)
                .build();
        notificationManager.notify(1, notification);
    }
}
