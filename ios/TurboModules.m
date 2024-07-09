//
//  TurboModules.m
//  StdApp
//
//  Created by netstratum on 08/07/24.
//
#import "TurboModules.h"
#import <Foundation/Foundation.h>
#import <React/RCTUIManager.h>

@implementation TurboModules
RCT_EXPORT_MODULE();
//ConsoleLogger *logger;

RCT_EXPORT_METHOD(startMonitoring) {
  running = YES;
  while (running) {
//    std::cout<<"Running";
//    NSThread.s
//    ("Running");

    NSLog(@"Running111111");
    sleep(0.5);
  }
  
}
RCT_EXPORT_METHOD(stopMonitoring){
  running = NO;
}

@end
