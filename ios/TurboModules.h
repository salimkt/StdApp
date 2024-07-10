//
//  TurboModules.h
//  StdApp
//
//  Created by netstratum on 08/07/24.
//
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

#ifndef TurboModules_h

#define TurboModules_h


@interface TurboModules : NSObject <RCTBridgeModule>

@property BOOL running;
// Define a property for the dispatch queue
@property (nonatomic, strong) dispatch_queue_t monitorQueue;

@end
#endif /* TurboModules_h */
