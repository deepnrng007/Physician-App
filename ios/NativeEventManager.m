#import "NativeEventManager.h"


@implementation NativeEventManager

{
  bool hasListeners;
}

// Will be called when this module's first listener is added.
-(void)startObserving {
    hasListeners = YES;
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
}

RCT_EXPORT_MODULE();

+ (id)allocWithZone:(NSZone *)zone {
    static NativeEventManager *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"getAllConversations", @"getTocListEvent",@"getEpisodeListEvent", @"onClickNotificationEvent"];
}

- (void)calendarEventReminderReceived
{
  if (hasListeners) {
  [self sendEventWithName:@"getAllConversations" body:@{@"name": @"haiiii"}];
  }
}

- (void)tOCRefreshEvent
{
  if (hasListeners) {
  [self sendEventWithName:@"getTocListEvent" body:@{@"name": @"haiiii"}];
  }
}

- (void)episodeRefreshEvent
{
  if (hasListeners) {
  [self sendEventWithName:@"getEpisodeListEvent" body:@{@"name": @"haiiii"}];
  }
}

- (void)onClickNotification:(NSString *)userInfo
{
  if (hasListeners) {
  [self sendEventWithName:@"onClickNotificationEvent" body:userInfo];
  }
}

@end
