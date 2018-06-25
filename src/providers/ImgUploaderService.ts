import {Injectable} from '@angular/core';
import {ActionSheetController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import {HttpApiService} from "./HttpApiService";

@Injectable()
export class ImgUploaderService {

  constructor(public actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              public http: HttpApiService,
              public transfer: FileTransfer) {
  }


  open(cb) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍照',
          icon: 'md-camera',
          handler: () => {
            this.takePhoto().then(data => {
              cb(data);
            })

          }

        }, {
          text: '从相册选取',
          icon: 'md-images',
          handler: () => {
            this.openAlbum().then(data => {
              cb(data);
            })

          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePhoto() {
    return new Promise((resolve, reject) => {
      let options: CameraOptions = {
        quality: 70,
        sourceType: 1,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
      this.camera.getPicture(options).then((imageFile) => {
        let base64Image = 'data:image/jpeg;base64,' + imageFile;
        console.log('imageFile  ' + base64Image);
        resolve(base64Image);
      }, (err) => {
        reject(err);
      });
    })
  }

  openAlbum() {
    return new Promise((resolve, reject) => {
      let options: CameraOptions = {
        quality: 70,
        sourceType: 0,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
      this.camera.getPicture(options).then((imageFile) => {
        let base64Image = 'data:image/jpeg;base64,' + imageFile;
        console.log('imageFile  ' + base64Image);
        resolve(base64Image);
      }, (err) => {
        reject(err);
      });
    })
  }

  upload(data) {
    let that = this;
    return new Promise((resolve, reject) => {
      const fileTransfer: FileTransferObject = that.transfer.create();
      var options: any;

      options = {
        fileKey: 'filecontent',
        fileName: 'xxxxx.jpg',
        mimeType: 'multipart/form-data',
        httpMethod: 'POST',
        headers: {}
      };

      that.http.get('getSign', {}).then(res => {
        let uploadUrl = 'https://web.image.myqcloud.com/photos/v2/10002631/ybpimg/0?sign=' + encodeURIComponent(String(res));
        fileTransfer.upload(data, uploadUrl, options).then((data) => {
          resolve(JSON.parse(data['response']));
        }, (err) => {
          reject(err);
        })
      }, err => {
        console.log(err)
      });
    })
  }
}
