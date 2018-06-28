//
//  CDVBaiduLocationSdk.m
//  GeTui-Cordova-Plugin
//
//  Created by scuhmz on 10/8/15.
//
//

#import "CDVBaiduLocationSdk.h"
#import "BaiduMapAPI_Base/BMKBaseComponent.h"
#import <BaiduMapAPI_Location/BMKLocationComponent.h>//引入定位功能所有的头文件


@implementation CDVBaiduLocationSdk



#pragma mark "API"
- (void)pluginInitialize {

  NSString*kAppId = [[self.commandDelegate settings] objectForKey:@"api_key"];

  _mapManager = [[BMKMapManager alloc]init];
  // 如果要关注网络及授权验证事件，请设定     generalDelegate参数
  BOOL ret = [_mapManager start:kAppId  generalDelegate:nil];
  if (!ret) {
    NSLog(@"manager start failed!");
  }

  _addrinfos = [[NSMutableDictionary alloc]init];

  _locService = [[BMKLocationService alloc]init];

  _geocodesearch = [[BMKGeoCodeSearch alloc]init];

  _geocodesearch.delegate = self;

  _locService.delegate = self;
  [_locService startUserLocationService];


}

-(void) onGetReverseGeoCodeResult:(BMKGeoCodeSearch *)searcher result:(BMKReverseGeoCodeResult *)result errorCode:(BMKSearchErrorCode)error
{

  if (result) {
    NSLog(@"result%@",result.address);
    NSLog(@"latitude%f",result.location.latitude);
    NSLog(@"longitude%f",  result.location.longitude);
    NSLog(@"addressDetail%@",  result.addressDetail);

    BMKAddressComponent*addressComponents = result.addressDetail;
    _addressComponents = [NSMutableDictionary dictionaryWithObjectsAndKeys:addressComponents.province,@"province",addressComponents.city,@"city",addressComponents.district,@"district",addressComponents.streetName,@"street",addressComponents.streetNumber,@"streetNumber",nil];


    [[NSUserDefaults standardUserDefaults] setObject:[[NSNumber numberWithDouble:result.location.latitude] stringValue]  forKey:@"latitude"];
    [[NSUserDefaults standardUserDefaults] setObject:[[NSNumber numberWithDouble:result.location.longitude] stringValue]  forKey:@"lontitude"];
    [[NSUserDefaults standardUserDefaults] setObject:result.address  forKey:@"addr"];
    [[NSUserDefaults standardUserDefaults] setObject:_addressComponents forKey:@"addressComponents"];


  }

}

- (void)getLocation:(CDVInvokedUrlCommand*)command{

  if ([[NSUserDefaults standardUserDefaults] objectForKey:@"latitude"]) {
    CDVPluginResult* pluginResult = nil;

    [_addrinfos setObject:[[NSUserDefaults standardUserDefaults] objectForKey:@"latitude"] forKey:@"latitude"];
    [_addrinfos setObject:[[NSUserDefaults standardUserDefaults] objectForKey:@"lontitude"]forKey:@"lontitude"];

    if ([[NSUserDefaults standardUserDefaults] objectForKey:@"addr"]) {
      [_addrinfos setObject:[[NSUserDefaults standardUserDefaults] objectForKey:@"addr"] forKey:@"addr"];
    }
    [_addrinfos setObject:[[NSUserDefaults standardUserDefaults] objectForKey:@"addressComponents"]forKey:@"addressComponents"];

    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:_addrinfos];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

  }else{
      NSString *error = @"定位失败";
      CDVPluginResult* pluginResult = nil;
      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error];
      [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];  }
}


/**
 *用户位置更新后，会调用此函数
 *@param userLocation 新的用户位置
 */
- (void)didUpdateBMKUserLocation:(BMKUserLocation *)userLocation
{
  if (userLocation) {

    NSLog(@"userLocation%@",  userLocation.location);

    [[NSUserDefaults standardUserDefaults] setObject:[[NSNumber numberWithDouble:userLocation.location.coordinate.latitude] stringValue]  forKey:@"latitude"];
    [[NSUserDefaults standardUserDefaults] setObject:[[NSNumber numberWithDouble:userLocation.location.coordinate.longitude] stringValue]  forKey:@"lontitude"];

    BMKReverseGeoCodeOption *reverseGeocodeSearchOption = [[BMKReverseGeoCodeOption alloc]init];
    reverseGeocodeSearchOption.reverseGeoPoint = userLocation.location.coordinate;
    BOOL flag = [_geocodesearch reverseGeoCode:reverseGeocodeSearchOption];

  }
}

@end
