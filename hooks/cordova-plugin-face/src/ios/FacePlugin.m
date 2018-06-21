//
//  FacePlugin.m
//
//  Created by sunx on 26/05/16.
//
//

#import "FacePlugin.h"
#import "MGBaseKit.h"
#import "MGLiveManager.h"
#import "MGIDCard.h"



@implementation FacePlugin
#pragma mark "API"

static NSString* toBase64(NSData* data) {
      //  SEL s1 = NSSelectorFromString(@"cdv_base64EncodedString");
      //  SEL s2 = NSSelectorFromString(@"base64EncodedString");
      //  SEL realSel = [data respondsToSelector:s1] ? s1 : s2;
      //  NSString* (*func)(id, SEL) = (void *)[data methodForSelector:realSel];
      //  return func(data, realSel);
      return [data base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
}


- (void)checkIDCard:(CDVInvokedUrlCommand*)command{


  NSMutableDictionary *args = [command.arguments objectAtIndex:0];
  NSNumber *cardSide = [args objectForKey:@"cardSide"];


  [MGLicenseManager licenseForNetWokrFinish:^(bool License) {
    if (License) {
      NSLog(@"SDK 授权【成功】");


      BOOL idcard = [MGIDCardManager getLicense];

      if (!idcard) {
        [[[UIAlertView alloc] initWithTitle:@"提示" message:@"SDK授权失败，请检查" delegate:self cancelButtonTitle:@"完成" otherButtonTitles:nil, nil] show];
        return;
      }

      MGIDCardManager *cardManager = [[MGIDCardManager alloc] init];

      [cardManager IDCardStartDetection:self.viewController IdCardSide:[cardSide intValue] == 0?IDCARD_SIDE_FRONT : IDCARD_SIDE_BACK

                                 finish:^(MGIDCardModel *model) {


                                   UIImage *idCardImg = [model croppedImageOfIDCard];
                                   UIImage *portraitImg = [model croppedImageOfPortrait];

                                   NSData *idCardImgData;
                                   if (UIImagePNGRepresentation(idCardImg) == nil) {

                                     idCardImgData = UIImageJPEGRepresentation(idCardImg, 1);

                                   } else {

                                     idCardImgData = UIImagePNGRepresentation(idCardImg);
                                   }

                                   NSData *portraitImgData;
                                   if (UIImagePNGRepresentation(portraitImg) == nil) {

                                     portraitImgData = UIImageJPEGRepresentation(portraitImg, 1);

                                   } else {

                                     portraitImgData = UIImagePNGRepresentation(portraitImg);
                                   }



                                   NSArray *key=[NSArray arrayWithObjects:@"idCardImgBase64",@"portraitImgBase64",nil];
                                   NSArray *value=[NSArray arrayWithObjects:toBase64(idCardImgData),toBase64(portraitImgData),nil];

                                   NSDictionary *result = [NSDictionary dictionaryWithObjects:value forKeys:key];

                                   CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:result];
                                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

                                 }
                                   errr:^(MGIDCardError error) {
                                     CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"检测失败"];
                                     [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                                   }];



    }else{
      CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"SDK 授权【失败】"];

      [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

    }
  }];
}


- (void)startFaceDecetion:(CDVInvokedUrlCommand*)command{


  [MGLicenseManager licenseForNetWokrFinish:^(bool License) {
    if (License) {
      NSLog(@"SDK 授权【成功】");
      if (![MGLiveManager getLicense]) {
        [[[UIAlertView alloc] initWithTitle:@"提示" message:@"SDK授权失败，请检查" delegate:self cancelButtonTitle:@"完成" otherButtonTitles:nil, nil] show];
        return;
      }

      MGLiveManager *manager = [[MGLiveManager alloc] init];
      manager.detectionWithMovier = YES;

      [manager startFaceDecetionViewController:self.viewController finish:^(FaceIDData *finishDic, UIViewController *viewController) {
        [viewController dismissViewControllerAnimated:YES completion:nil];

        NSArray *key=[NSArray arrayWithObjects:@"delta",@"imgBase64",@"action1",@"action2",@"action3",nil];
        NSArray *value=[NSArray arrayWithObjects:
                        [finishDic delta],
                        toBase64([[finishDic images] valueForKey:@"image_best"]),
                        toBase64([[finishDic images] valueForKey:@"image_action1"]),
                        toBase64([[finishDic images] valueForKey:@"image_action2"]),
                        toBase64([[finishDic images] valueForKey:@"image_action3"]),
                        nil];

        NSDictionary *result = [NSDictionary dictionaryWithObjects:value forKeys:key];

        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:result];

        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];


      } error:^(MGLivenessDetectionFailedType errorType, UIViewController *viewController) {
        [viewController dismissViewControllerAnimated:YES completion:nil];

        NSString *error = @"";
        switch (errorType) {
          case DETECTION_FAILED_TYPE_ACTIONBLEND:
          {
            error = @"活体检测未成功\n请按照提示完成动作";
          }
            break;
          case DETECTION_FAILED_TYPE_NOTVIDEO:
          {
            error = @"活体检测未成功";

          }
            break;
          case DETECTION_FAILED_TYPE_TIMEOUT:
          {
            error = @"活体检测未成功\n请在规定时间内完成动作";

          }
            break;
          default:
          {
            error = @"活体检测失败\n请重新检测";

          }
            break;
        }

        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error];


        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

      }];

    }else{
      CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"SDK 授权【失败】"];

      [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

    }
  }];

}


@end
