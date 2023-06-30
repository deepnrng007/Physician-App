//
//  Utils.h
//  physicianAppProvider
//
//  Created by Mukthahar Shaik on 08/08/22.
//

#import <Foundation/Foundation.h>

@interface Utils : NSObject {}

+ (Boolean)setEncryptedStorage:(NSString*)key data:(NSString*)value;
+ (NSString *)getEncryptedStorage:(NSString*)key;
+ (NSString *)convertJsonToString:(NSDictionary *)json;
+ (NSArray *) convertStringToJsonArray:(NSString *)str;
+ (NSDictionary *)findFirstIndexOf: (NSArray *)arr  key:(NSString *)key value:(NSString *)value;
+(NSDate *) convertStringToDate:(NSString *)date;
@end

