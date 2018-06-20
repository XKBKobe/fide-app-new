import {Injectable} from '@angular/core';
import {StorageService} from "./StorageService";
import {MessageService} from "./MessageService";
import {HttpApiService} from "./HttpApiService";
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import {BASIC_SETTINGS_JSON} from "./BaseConfig";


@Injectable()
export class CordovaService {
  opts: any = {};

  constructor(public uiService: MessageService,
              public storage: StorageService,
              public http: HttpApiService,
              public transfer: FileTransfer) {
  }


  //OCR身份证信息 type :0正面，1反面
  checkIDCard(type) {
    console.log('身份证type', type);
    let that = this;
    return new Promise((resolve, reject) => {
      if (that.uiService.isMobile()) {
        //获取身份证照片，返回 **身份证照片(idCardImgBase64)** 和 **图像中头像照片(portraitImgBase64)**
        Cordova.plugins.FacePlugin.checkIDCard(
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
                  that.storage.setItemCb('IDfrontBase64', data).then(data => {
                    resolve(res);
                  })
                } else { //反面
                  // localStorage.setItem('IDbackBase64',data);
                  that.storage.setItemCb('IDbackBase64', data).then(data => {
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

}
