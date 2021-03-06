import {Injectable} from '@angular/core';
import {MessageService} from "./MessageService";
import {HttpApiService} from "./HttpApiService";
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import {BASIC_SETTINGS_JSON} from "./BaseConfig";
import {StorageService} from "./StorageService";


@Injectable()
export class CordovaService {
  opts: any = {};

  constructor(public uiService: MessageService,
              public storage: StorageService,
              public http: HttpApiService,
              public transfer: FileTransfer) {
  }


  //获取定位
  getLocation() {
    return new Promise((resolve, reject) => {
      if (this.uiService.isMobile()) {
        cordova.plugins.baidumap_location.getCurrentPosition(function (result) {
          console.log(JSON.stringify(result, null, 4));
          resolve(result);
        }, function (err) {
          reject(err);
        });
      } else {
        console.log('该功能只能用于真机');
        reject(false);
      }
    });
  }

  //OCR身份证信息 type :0正面，1反面
  checkIDCard(type) {
    let that = this;
    return new Promise((resolve, reject) => {
      if (that.uiService.isMobile()) {
        //获取身份证照片，返回 **身份证照片(idCardImgBase64)** 和 **图像中头像照片(portraitImgBase64)**
        cordova.plugins.FacePlugin.checkIDCard(
          {
            cardSide: type
          },
          function (result) {//身份证检测成功回调函数,success返回数据对象。
            let data = 'data:image/jpeg;base64,' + result['idCardImgBase64'];
            const fileTransfer: FileTransferObject = that.transfer.create();
            let options: any;

            options = {
              fileKey: 'image',
              params: {
                api_key: BASIC_SETTINGS_JSON.faceCheckSettings['api_key'],
                api_secret: BASIC_SETTINGS_JSON.faceCheckSettings['api_secret'],
              }
            };
            //为了兼容安卓华为手机核身照片存在回车换行符号
            data = data.replace(/\s/g, "");
            that.uiService.showLoading();
            fileTransfer.upload(data, "https://api.faceid.com/faceid/v1/ocridcard", options)
              .then((res) => {
                console.log('上传照片成功', JSON.stringify(res));
                that.uiService.hideLoading();
                //正面
                if (type == 0) {
                  // localStorage.setItem('IDfrontBase64',data);
                  that.storage.setItem('IDfrontBase64', data).then(data => {
                    resolve(res);
                  })
                } else { //反面
                  // localStorage.setItem('IDbackBase64',data);
                  that.storage.setItem('IDbackBase64', data).then(data => {
                    resolve(res);
                  })
                }
              }, (err) => {
                that.uiService.hideLoading();
                reject('上传照片失败' + JSON.stringify(err));
              });
          },
          function (error) {
            reject('cordova' + error);
          }
        );
      } else {
        reject('该功能只能用于真机');
      }
    })
  }

  //活体检测
  verifyFace(opt) {
    let that = this;
    return new Promise((resolve, reject) => {
      if (this.uiService.isMobile()) {
        cordova.plugins.FacePlugin.startFaceDecetion(
          function (result) {

            let data = 'data:image/jpeg;base64,' + result['imgBase64'];
            data = data.replace(/\s/g, "");

            const fileTransfer: FileTransferObject = that.transfer.create();
            let options: any;
            // console.log('活体最佳照片', result['imgBase64']);
            // console.log('活体最佳照片', result['delta']);
            options = {
              fileKey: 'image_best',
              params: {
                api_key: BASIC_SETTINGS_JSON.faceCheckSettings['api_key'],
                api_secret: BASIC_SETTINGS_JSON.faceCheckSettings['api_secret'],
                comparison_type: 1,
                face_image_type: 'meglive',
                idcard_name: opt['name'],
                idcard_number: opt['number'],
                delta: result['delta']
              }
            };
            //为了兼容安卓华为手机核身照片存在回车换行符号
            data = data.replace(/\s/g, "");
            that.uiService.showLoading();
            fileTransfer.upload(data, "https://api.megvii.com/faceid/v2/verify", options)
              .then((res) => {
                console.log('验证活体成功', res);
                that.uiService.hideLoading();
                //保存最佳照片
                // localStorage.setItem('imageBest',data);
                that.storage.setItem('imageBest', data).then(data => {
                  resolve(res);
                });
              }, (err) => {
                that.uiService.hideLoading();
                reject('verifyFail' + err);
              });
          },
          function (err) {
            // self.uiService.showToastBottom(err);
            console.log('动作不标准', err);
            reject('cordova' + err);
          });
      } else {
        reject('该功能只能用于真机');
      }
    })
  }

}
