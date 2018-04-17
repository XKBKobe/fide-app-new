import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ImageViewerController} from 'ionic-img-viewer';

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
              public imageViewerCtrl: ImageViewerController) {
    this._imageViewerCtrl = imageViewerCtrl;

  }

  ngOnInit() {
    this.checkStatus = 'IDSHOW';
    this.IDfrontBase64 = 'assets/imgs/datum/ID_front_photo.png';
    this.IDbackBase64 = 'assets/imgs/datum/ID_back_photo.png';
    this.IDfrontBigImg = 'assets/imgs/datum/big/IDfrontphotoBig.png';
    this.IDbackBigImg = 'assets/imgs/datum/big/IDbackphotoBig.png';
  }

  // presentImage(myImage) {
  //   const imageViewer = this._imageViewerCtrl.create(myImage,{enableBackdropDismiss:true});
  //   imageViewer.present();
  // }
}
