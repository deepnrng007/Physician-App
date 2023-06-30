#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface NativeEventManager : RCTEventEmitter <RCTBridgeModule>
-(void)calendarEventReminderReceived;
-(void)tOCRefreshEvent;
-(void)episodeRefreshEvent;
-(void)onClickNotification:(NSString *)userInfo;
@end
