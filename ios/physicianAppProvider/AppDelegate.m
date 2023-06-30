#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Firebase.h>
#import "NativeEventManager.h"
#import "Utils.h"
#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

static void ClearKeychainIfNecessary() {
    // Checks wether or not this is the first time the app is run
    if ([[NSUserDefaults standardUserDefaults] boolForKey:@"HAS_RUN_BEFORE"] == NO) {
        // Set the appropriate value so we don't clear next time the app is launched
        [[NSUserDefaults standardUserDefaults] setBool:YES forKey:@"HAS_RUN_BEFORE"];

        NSArray *secItemClasses = @[
            (__bridge id)kSecClassGenericPassword,
            (__bridge id)kSecClassInternetPassword,
            (__bridge id)kSecClassCertificate,
            (__bridge id)kSecClassKey,
            (__bridge id)kSecClassIdentity
        ];

        // Maps through all Keychain classes and deletes all items that match
        for (id secItemClass in secItemClasses) {
            NSDictionary *spec = @{(__bridge id)kSecClass: secItemClass};
            SecItemDelete((__bridge CFDictionaryRef)spec);
        }
    }
}

@implementation AppDelegate

bool isGrantedNotificationAccess;
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif
ClearKeychainIfNecessary();
  
  if (launchOptions != nil) {
          // Launched from push notification
          NSDictionary *notification = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
    if(notification!= NULL){
      NSLog(@"Lunched through push notification :%@",notification);
      dispatch_time_t delay = dispatch_time(DISPATCH_TIME_NOW, NSEC_PER_SEC * 0.2);
      dispatch_after(delay, dispatch_get_main_queue(), ^(void){
        NSLog(@"timeout after a second :%@",notification);
        exit(0);
      });
    }
  }
  //====================== Firebase Configration ===================
  [FIRApp configure];
  [FIRMessaging messaging].delegate = self;
  isGrantedNotificationAccess=false;
  UNUserNotificationCenter *center = [UNUserNotificationCenter           currentNotificationCenter];
  center.delegate=self;
  if ([UNUserNotificationCenter class] != nil) {
      [UNUserNotificationCenter currentNotificationCenter].delegate = self;
    
    UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert         +UNAuthorizationOptionSound;
      [[UNUserNotificationCenter currentNotificationCenter]
          requestAuthorizationWithOptions:authOptions
          completionHandler:^(BOOL granted, NSError * _Nullable error) {
        isGrantedNotificationAccess = granted;
          }];
    } else {
      UNAuthorizationOptions allNotificationTypes = UNAuthorizationOptionAlert         +UNAuthorizationOptionSound;
      UIUserNotificationSettings *settings =
      [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
      [application registerUserNotificationSettings:settings];
    }
  isGrantedNotificationAccess=true;
    [application registerForRemoteNotifications];
  
  //========================End firebase configuration ===================

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"physicianAppProvider"
                                            initialProperties:nil];
  

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (void)applicationWillTerminate:(NSNotification *)notification{
  NSLog(@"applicationWillTerminate");
}

//=========================== Firebase Functions ======================

- (NSString *)fetchDeviceToken:(NSData *)deviceToken {
    NSUInteger len = deviceToken.length;
    if (len == 0) {
        return nil;
    }
    const unsigned char *buffer = deviceToken.bytes;
    NSMutableString *hexString  = [NSMutableString stringWithCapacity:(len * 2)];
    for (int i = 0; i < len; ++i) {
        [hexString appendFormat:@"%02x", buffer[i]];
    }
    return [hexString copy];
}

- (void)application:(UIApplication *)application
    didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    NSString *str2 = [self fetchDeviceToken:deviceToken];
    [Utils setEncryptedStorage:@"FCM_TOKEN_KEY" data:str2];
    [FIRMessaging messaging].APNSToken = deviceToken;
}

- (void)messaging:(FIRMessaging *)messaging didReceiveRegistrationToken:(NSString *)fcmToken {
    NSLog(@"FCM registration token: %@", fcmToken);
}


- (void)checkNotification:(NSDictionary *)userInfo {
  NSLog(@"silent notification: %@", userInfo);
  NSString *actionType = [userInfo valueForKey:@"actionType"];
  NSString *title = [userInfo valueForKey:@"title"];
  NSString *body = [userInfo valueForKey:@"body"];
  NSString *dateInsertedTimeStamp = [userInfo valueForKey:@"dateInsertedTimeStamp"];
  
  NSString *actionEntityId = [userInfo valueForKey:@"actionEntityId"];
  NSString *storedValue = [Utils getEncryptedStorage:@"CONVERSATION_ID_KEY"];
  NSString *chatVisitTime = [Utils getEncryptedStorage:@"LASTCHATSCREENVISIT"];
  if([actionType isEqualToString:@"NEW_MESSAGE"]){
    if(storedValue!=actionEntityId){
      if([chatVisitTime isEqualToString:@""]){
          NativeEventManager *event = [[NativeEventManager alloc] init];
          [event calendarEventReminderReceived];
          [AppDelegate showNotification: title valuestr2:body data: userInfo];
      }else{
        NSArray *chatTimeStampsArr = [Utils convertStringToJsonArray:chatVisitTime];
        if(chatTimeStampsArr){
          NSDictionary *timeStampObj = [Utils findFirstIndexOf:chatTimeStampsArr key:@"convoID" value:actionEntityId];
          NSString *visitTime = [timeStampObj valueForKey:@"lastVisitTime"];
          NSDate *notify = [Utils convertStringToDate:dateInsertedTimeStamp];
          NSDate *visit = [Utils convertStringToDate:visitTime];
          if([notify compare:visit]>=0){
            NativeEventManager *event = [[NativeEventManager alloc] init];
            [event calendarEventReminderReceived];
            [AppDelegate showNotification: title valuestr2:body data: userInfo];
          }
        }
      }
    }
    
  }else if([actionType isEqualToString:@"NEW_TOC"]){
    NativeEventManager *event = [[NativeEventManager alloc] init];
    [event tOCRefreshEvent];
    [AppDelegate showNotification: title valuestr2:body data: userInfo];
  }else if([actionType isEqualToString:@"PATIENT_OFFTRACK"]){
    NativeEventManager *event = [[NativeEventManager alloc] init];
    [event episodeRefreshEvent];
    [AppDelegate showNotification: title valuestr2:body data:userInfo];
  }
  else [AppDelegate showNotification:title valuestr2:body data:userInfo];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
    fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  [[FIRMessaging messaging] appDidReceiveMessage:userInfo];
  NSLog(@"didReceiveRemoteNotification %@", userInfo);
  [self checkNotification:userInfo];
  completionHandler(UIBackgroundFetchResultNewData);
}

+ (void) showNotification: (NSString*)title valuestr2: (NSString*)body data:(NSDictionary *) userInfo {
  if(isGrantedNotificationAccess){
    UNMutableNotificationContent *content = [[UNMutableNotificationContent             alloc] init];
    NSString *actionEntityId = [userInfo valueForKey:@"actionEntityId"];
    NSString *actionType = [userInfo valueForKey:@"actionType"];
    if([actionType isEqualToString:@"NEW_MESSAGE"]){
      NSTimeInterval milliseconds = [[NSDate date] timeIntervalSince1970];
      NSString *seconds = [NSString stringWithFormat:@"%f",milliseconds];
      actionEntityId =seconds;
    }
    
    NSURLRequest *req = [NSURLRequest requestWithURL:[NSURL URLWithString:body]];
    bool valid = [NSURLConnection canHandleRequest:req];
    content.title = title;
    content.body = valid ? @"Attachment" : body;
    content.userInfo=userInfo;
    content.sound = [UNNotificationSound defaultSound];
    UNTimeIntervalNotificationTrigger* trigger = [UNTimeIntervalNotificationTrigger
                triggerWithTimeInterval:1 repeats:NO];
    UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:actionEntityId content:content trigger:trigger];
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    [center addNotificationRequest:request withCompletionHandler:nil];
  }
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
  UNNotificationPresentationOptions presentationOptions = UNNotificationPresentationOptionSound+UNNotificationPresentationOptionAlert;
  NSLog(@"willPresentNotification");
  completionHandler(presentationOptions);
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       didReceiveNotificationResponse:(UNNotificationResponse *)response
       withCompletionHandler:(void (^)(void))completionHandler {
  NSDictionary *userInfo = response.notification.request.content.userInfo;
  completionHandler();
  NSString *stringData = [Utils convertJsonToString:userInfo];
  [Utils setEncryptedStorage:@"NOTIFICATION_PAYLOAD" data:stringData];
  NativeEventManager *event = [[NativeEventManager alloc] init];
  [event onClickNotification:stringData];
 }

//=============================End Firebase Functions==================

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end