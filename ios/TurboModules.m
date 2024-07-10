//
//  TurboModules.m
//  StdApp
//
//  Created by netstratum on 08/07/24.
//
#import "TurboModules.h"
#import <Foundation/Foundation.h>
#import <React/RCTUIManager.h>
#import <mach/mach.h>
#import <sys/sysctl.h>

@implementation TurboModules
RCT_EXPORT_MODULE();
//ConsoleLogger *logger;

- (uint64_t)getTotalMemory {
    int mib[2] = {CTL_HW, HW_MEMSIZE};
    uint64_t totalMemory = 0;
    size_t length = sizeof(totalMemory);
    sysctl(mib, 2, &totalMemory, &length, NULL, 0);
    return totalMemory;
}

- (void)getMemoryUsage:(uint64_t *)usedMemory freeMemory:(uint64_t *)freeMemory {
    mach_port_t host_port = mach_host_self();
    mach_msg_type_number_t host_size = sizeof(vm_statistics_data_t) / sizeof(integer_t);
    vm_size_t page_size;
    vm_statistics_data_t vm_stat;

    host_page_size(host_port, &page_size);
    if (host_statistics(host_port, HOST_VM_INFO, (host_info_t)&vm_stat, &host_size) != KERN_SUCCESS) {
        NSLog(@"Failed to fetch vm statistics");
        return;
    }

    uint64_t freeMemoryValue = (uint64_t)vm_stat.free_count * (uint64_t)page_size;
    uint64_t usedMemoryValue = ((uint64_t)vm_stat.active_count +
                                (uint64_t)vm_stat.inactive_count +
                                (uint64_t)vm_stat.wire_count) *  (uint64_t)page_size;

    if (usedMemory) *usedMemory = usedMemoryValue;
    if (freeMemory) *freeMemory = freeMemoryValue;
}

- (void)logAppMemoryUsage {
    task_basic_info_data_t taskInfo;
    mach_msg_type_number_t infoCount = TASK_BASIC_INFO_COUNT;

    kern_return_t kernStatus = task_info(mach_task_self(), TASK_BASIC_INFO, (task_info_t)&taskInfo, &infoCount);
    if (kernStatus != KERN_SUCCESS) {
        NSLog(@"Error getting task info: %s", mach_error_string(kernStatus));
        return;
    }

    NSLog(@"App Memory Usage: %lu MB", taskInfo.resident_size / (1024 * 1024));
}

- (void)logMemoryDetails {
    uint64_t totalMemory = [self getTotalMemory];
    uint64_t usedMemory = 0;
    uint64_t freeMemory = 0;

    [self getMemoryUsage:&usedMemory freeMemory:&freeMemory];
    [self logAppMemoryUsage];

    NSLog(@"Total Memory: %llu MB", totalMemory / (1024 * 1024));
    NSLog(@"Used Memory: %llu MB", usedMemory / (1024 * 1024));
    NSLog(@"Free Memory: %llu MB", freeMemory / (1024 * 1024));
}

RCT_EXPORT_METHOD(startMonitoring) {
  if (!_monitorQueue) {
      _monitorQueue = dispatch_queue_create("com.yourapp.monitorQueue", NULL);
    }
    
    _running = YES;
 
    dispatch_async(_monitorQueue, ^{
      while (self->_running) {
        [self logMemoryDetails];
       
        // Sleep for a short time to prevent excessive CPU usage
       [NSThread sleepForTimeInterval:2.0];
      }
      NSLog(@"Stopped monitoring");
    });
}
RCT_EXPORT_METHOD(stopMonitoring){
  _running = NO;
  NSLog(@"Running111111---123 %@",_running?@"yes":@"No");
}


@end
