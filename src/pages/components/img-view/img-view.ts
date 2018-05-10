import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'img-view',
  templateUrl: 'img-view.html'
})
export class ImgViewPage {
  @Input('headerHide') headerHide: boolean = false;
  @Input('imgData') imgData;
  @Input('icon') icon;
  @Input('last') last;
  @Input('isRequire') isRequire;
  @Input('uploadPicStatus') uploadPicStatus;
  //商户的uuid
  @Output() imgMatUrl: EventEmitter<any> = new EventEmitter<any>();

  title: any;
  description: any;
  img:any;
  src: any;
  bigSrc: any;

  uploadDisabled: boolean = false;

  setJson: any = {
    USER_IDENTITY: {
      title: "身份证正面",
      description: "身份证正面",
      img:"assets/imgs/myData/basicsData/bank_inputIcon_normal.png",
      src: "assets/image/datum/ID_front_photo.png",
      bigSrc: "assets/image/datum/big/IDfrontphotoBig.png",
    },
    USER_IDENTITY_BACK: {
      title: "身份证反面",
      description: "身份证反面",
      img:"assets/imgs/myData/basicsData/bank_inputIcon_normal.png",
      src: "assets/image/datum/ID_back_photo.png",
      bigSrc: "assets/image/datum/big/IDbackphotoBig.png",
    },
    PERSONAL_PROPERTY_CERTIFICATE: {
      title: "房产证",
      description: "房产证明(或房产查询单)",
      img:"assets/imgs/myData/basicsData/bank_inputIcon_normal.png",
      src: "assets/imgs/datum/estatephoto.png",
      bigSrc: "assets/imgs/datum/big/estatephotoBig.png",
    },
    PERSONAL_LIVE_PROOF: {
      title: "居住证明照片",
      description: "信用卡纸质账单(水电煤账单)",
      img:"assets/imgs/myData/basicsData/address.png",
      src: "assets/imgs/datum/livephoto.png",
      bigSrc: "assets/imgs/datum/big/livephotoBig.png",
    },
    PERSONAL_RESIDENCE_BOOK: {
      title: "户口本照片",
      description: "户口本照片",
      img:"assets/imgs/myData/basicsData/accountphoto.png",
      src: "assets/imgs/datum/accountphoto.png",
      bigSrc: "assets/imgs/datum/big/accountphotoBig.png",
    },
    PERSONAL_FINANCIAL_ASSETS_PROOF: {
      title: "金融资产证明照片",
      description: "金融资产证明(需银行盖章)",
      img:"assets/imgs/myData/basicsData/monetaryphoto.png",
      src: "assets/imgs/datum/businessphoto.png",
      bigSrc: "assets/imgs/datum/big/businessphotoBig.png",
    },
    MARRIAGE_LICENSE: {
      title: "婚姻证照片",
      description: "婚姻证照片",
      img:"assets/imgs/myData/basicsData/monetaryphoto.png",
      src: "assets/imgs/datum/marriagephoto.png",
      bigSrc: "assets/imgs/datum/big/marriagephotoBig.png",
    },
    PERSONAL_DRIVER_LICENSE: {
      title: "行驶证照片",
      description: "行驶证照片",
      img:"",
      src: "assets/imgs/datum/carphoto.png",
      bigsrc: "assets/imgs/datum/big/carphotoBig.png",
    },
    SPOUSE_IDENTITY: {
      title: "配偶身份证正面",
      description: "配偶身份证正面",
      img:"",
      src: "assets/imgs/datum/ID_front_photo.png",
      bigSrc: "assets/imgs/datum/big/IDfrontphotoBig.png",
    },
    SPOUSE_IDENTITY_BACK: {
      title: "配偶身份证反面",
      description: "身份证反面",
      img:"",
      src: "assets/imgs/datum/ID_back_photo.png",
      bigSrc: "assets/imgs/datum/big/IDbackphotoBig.png",
    },
    DIPLOMA: {
      title: "学历学位证",
      description: "学历学位证",
      img:"assets/imgs/datum/diploma.png",
      src: "assets/imgs/datum/degreephoto.png",
      bigSrc: "assets/imgs/datum/big/degreephotoBig.png",
    },



  };

  constructor(public navCtrl: NavController) {

  }


  ngOnInit() {
    let type = this.imgData.matTypeCode;
    this.title = this.setJson[type].title;
    this.description = this.setJson[type].description;
    this.img = this.setJson[type].img;
    this.src = this.imgData.matUrl ? this.imgData.matUrl + "&w=200&h=100" : '';
    this.bigSrc = this.imgData.matUrl;
    this.uploadDisabled = this.uploadPicStatus;
    if (!this.src) {
      this.src = this.setJson[type].src;
      this.bigSrc = this.setJson[type].bigSrc;
    }
  }
}
