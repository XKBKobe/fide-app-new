import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ImageViewerController} from 'ionic-img-viewer';
import {CordovaService} from "../../../providers/CordovaService";
import {StorageService} from "../../../providers/StorageService";

@Component({
  selector: 'page-identity-check',
  templateUrl: 'identity-check.html'
})
export class IdentityCheckPage {
  _imageViewerCtrl: ImageViewerController;

  // checkStatus---状态如下：
  // IDSHOW:身份证正反面
  // OCRSHOW:OCR信息
  // CHECKSUC:核身成功
  // CHECKLOANSUC:贷款流程核身成功
  // CHECKFAIL:核身失败
  // CHECKLOANFAIL:贷款流程核身失败

  checkStatus: any;
  //身份证正面
  IDfrontBase64: any;
  //身份证反面
  IDbackBase64: any;
  //身份证正面big
  IDfrontBigImg: any;
  //身份证反面big
  IDbackBigImg: any;

  constructor(public navCtrl: NavController,
              public imageViewerCtrl: ImageViewerController,
              public cordovaService: CordovaService,
              public storage: StorageService) {


  }

  ngOnInit() {
    this.checkStatus = 'IDSHOW';
    this.IDfrontBase64 = 'assets/imgs/datum/ID_front_photo.png';
    this.IDbackBase64 = 'assets/imgs/datum/ID_back_photo.png';
    this.IDfrontBigImg = 'assets/imgs/datum/big/IDfrontphotoBig.png';
    this.IDbackBigImg = 'assets/imgs/datum/big/IDbackphotoBig.png';
  }

  checkFrontID(type) {
    let that = this;
    alert('type' +type);
    this.cordovaService.checkIDCard(type).then(res => {
      //正面
      that.storage.getItem('IDfrontBase64').then(data => {
        that.IDfrontBase64 = data;
        that.IDfrontBigImg = data;
        console.log(data);
      }, err => {
        console.log('IDfrontBase64 ' + err);
      });
      //OCR正面完成
    }, err => {
      console.log(err);
    });
  }

  // presentImage(myImage) {
  //   const imageViewer = this._imageViewerCtrl.create(myImage,{enableBackdropDismiss:true});
  //   imageViewer.present();
  // }
}
