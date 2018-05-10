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
  img: any;
  src: any;
  bigSrc: any;

  uploadDisabled: boolean = false;

  setJson: any = {
    USER_IDENTITY: {
      title: "身份证正面",
      description: "身份证正面",
      img: "assets/imgs/myData/basicsData/bank_inputIcon_normal.png",
      src: "assets/image/datum/ID_front_photo.png",
      bigSrc: "assets/image/datum/big/IDfrontphotoBig.png"
    },
    USER_IDENTITY_BACK: {
      title: "身份证反面",
      description: "身份证反面",
      img: "assets/imgs/myData/basicsData/bank_inputIcon_normal.png",
      src: "assets/image/datum/ID_back_photo.png",
      bigSrc: "assets/image/datum/big/IDbackphotoBig.png"
    },
    PERSONAL_PROPERTY_CERTIFICATE: {
      title: "房产证",
      description: "房产证明(或房产查询单)",
      img: "assets/imgs/myData/basicsData/bank_inputIcon_normal.png",
      src: "assets/imgs/datum/estatephoto.png",
      bigSrc: "assets/imgs/datum/big/estatephotoBig.png"
    },
    PERSONAL_LIVE_PROOF: {
      title: "居住证明照片",
      description: "信用卡纸质账单(水电煤账单)",
      img: "assets/imgs/myData/basicsData/address.png",
      src: "assets/imgs/datum/livephoto.png",
      bigSrc: "assets/imgs/datum/big/livephotoBig.png"
    },
    PERSONAL_RESIDENCE_BOOK: {
      title: "户口本照片",
      description: "户口本照片",
      img: "assets/imgs/myData/basicsData/accountphoto.png",
      src: "assets/imgs/datum/accountphoto.png",
      bigSrc: "assets/imgs/datum/big/accountphotoBig.png"
    },
    PERSONAL_FINANCIAL_ASSETS_PROOF: {
      title: "金融资产证明照片",
      description: "金融资产证明(需银行盖章)",
      img: "assets/imgs/myData/basicsData/monetaryphoto.png",
      src: "assets/imgs/datum/businessphoto.png",
      bigSrc: "assets/imgs/datum/big/businessphotoBig.png"
    },
    MARRIAGE_LICENSE: {
      title: "婚姻证照片",
      description: "婚姻证照片",
      img: "assets/imgs/myData/basicsData/monetaryphoto.png",
      src: "assets/imgs/datum/marriagephoto.png",
      bigSrc: "assets/imgs/datum/big/marriagephotoBig.png"
    },
    PERSONAL_DRIVER_LICENSE: {
      title: "行驶证照片",
      description: "行驶证照片",
      img: "",
      src: "assets/imgs/datum/carphoto.png",
      bigsrc: "assets/imgs/datum/big/carphotoBig.png"
    },
    SPOUSE_IDENTITY: {
      title: "配偶身份证正面",
      description: "配偶身份证正面",
      img: "",
      src: "assets/imgs/datum/ID_front_photo.png",
      bigSrc: "assets/imgs/datum/big/IDfrontphotoBig.png"
    },
    SPOUSE_IDENTITY_BACK: {
      title: "配偶身份证反面",
      description: "身份证反面",
      img: "",
      src: "assets/imgs/datum/ID_back_photo.png",
      bigSrc: "assets/imgs/datum/big/IDbackphotoBig.png"
    },
    DIPLOMA: {
      title: "学历学位证",
      description: "学历学位证",
      img: "assets/imgs/myData/basicsData/diploma.png",
      src: "assets/imgs/datum/degreephoto.png",
      bigSrc: "assets/imgs/datum/big/degreephotoBig.png"
    },
    ORG_COM_BUSINESS_LICENSE: {
      title: "营业执照照片",
      description: "营业执照照片",
      img: "assets/imgs/myData/basicsData/businessphoto.png",
      src: "assets/imgs/datum/businessphoto.png",
      bigSrc: "assets/imgs/datum/big/businessphotoBig.png"
    },
    LOAN_SNAPSHOP: {
      title: "淘宝/天猫贷款截图",
      description: "贷款截图",
      img: "assets/imgs/myData/basicsData/shopnamel.png",
      src: "assets/imgs/datum/tmallphoto.png",
      bigSrc: "assets/imgs/datum/big/tmallphotoBig.png"
    },
    REGISTER_SNAPSHOP: {
      title: "店铺注册截图",
      description: "注册截图",
      img: "assets/imgs/myData/basicsData/shopReg.png",
      src: "assets/imgs/datum/shopRegphoto.png",
      bigSrc: "assets/imgs/datum/big/shopRegphotoBig.png"
    },
    SHARES_IDENTITY: {
      title: "股东身份证正面",
      description: "股东身份证正面",
      img: "",
      src: "assets/imgs/datum/ID_front_photo.png",
      bigSrc: "assets/imgs/datum/big/IDfrontphotoBig.png"
    },
    SHARES_IDENTITY_BACK: {
      title: "股东身份证反面",
      description: "股东身份证反面",
      img: "",
      src: "assets/imgs/datum/ID_back_photo.png",
      bigSrc: "assets/imgs/datum/big/IDbackphotoBig.png"
    },
    SHARES_CERTIFICATE: {
      title: "股权证明",
      description: "股权证明",
      img: "assets/imgs/myData/basicsData/stockRight.png",
      src: "assets/imgs/datum/stockRightphoto.png",
      bigSrc: "assets/imgs/datum/big/stockRightphotoBig.png"
    },
    AGENT_CONTRACT_CONSIGNATION: {
      title: "授权代理合同",
      description: "授权代理合同",
      img: "assets/imgs/myData/basicsData/sanContract.png",
      src: "assets/imgs/datum/contractphoto.png",
      bigSrc: "assets/imgs/datum/big/contractphotoBig.png"
    },
    PERSONAL_TAX_REGIST_CERTIFICATE: {
      title: "税务登记证",
      description: "税务登记证",
      img: "assets/imgs/myData/basicsData/taxphoto.png",
      src: "assets/imgs/datum/taxphoto.png",
      bigSrc: "assets/imgs/datum/big/taxphotoBig.png"
    },
    PERSONAL_ORG_CODE_CERTIFICATE: {
      title: "机构代码证",
      description: "机构代码证",
      img: "assets/imgs/myData/basicsData/agencycodephoto.png",
      src: "assets/imgs/datum/agencycodephoto.png",
      bigSrc: "assets/imgs/datum/big/agencycodephotoBig.png"
    },
    PERSONAL_CAPITAL_VERIFICATION_REPORT: {
      title: "验资报告",
      description: "验资报告",
      img: "assets/imgs/myData/basicsData/verificationreportphoto.png",
      src: "assets/imgs/datum/verificationreportphoto.png",
      bigSrc: "assets/imgs/datum/big/verificationreportphotoBig.png"
    },
    FRANCHISE_CONTRACT: {
      title: "加盟合同",
      description: "加盟合同",
      img: "assets/imgs/myData/basicsData/reportphoto.png",
      src: "assets/imgs/datum/franchiseContract.png",
      bigSrc: "assets/imgs/datum/big/franchiseContractBig.jpg",
    },
    LEASE_AGREEMENT: {
      title: "租赁合同",
      description: "租赁合同",
      img: "assets/imgs/myData/basicsData/leaseAgreement.png",
      src: "assets/imgs/datum/leaseAgreement.png",
      bigSrc: "assets/imgs/datum/big/leaseAgreementBig.jpg"
    },
    ORG_CREDIT: {
      title: "企业征信",
      description: "企业征信",
      img: "assets/imgs/myData/basicsData/enterpriseCredit.png",
      src: "assets/imgs/datum/enterpriseCredit.png",
      bigSrc: "assets/imgs/datum/big/enterpriseCreditPhotoBig.png"
    },
    JURIDICAL_PERSONS_IDENTITY: {
      title: "法人身份证正面",
      description: "身份证正面",
      img: "",
      src: "assets/imgs/datum/ID_front_photo.png",
      bigSrc: "assets/imgs/datum/big/IDfrontphotoBig.png",

    },
    JURIDICAL_PERSONS_IDENTITY_BACK: {
      title: "法人身份证反面",
      description: "身份证反面",
      img: "",
      src: "assets/imgs/datum/ID_back_photo.png",
      bigSrc: "assets/imgs/datum/big/IDbackphotoBig.png"
    },
    THREE_PARTY_PAYMENT_CONTRACT: {
      title: "三方回款任务合同",
      description: "三方回款任务合同",
      img: "assets/imgs/myData/basicsData/contractphoto.png",
      src: "assets/imgs/datum/contractphoto.png",
      bigSrc: "assets/imgs/datum/big/contractphotoBig.png"
    },
    USER_CREDIT: {
      title: "个人征信",
      description: "个人征信",
      img: "assets/imgs/myData/basicsData/corporateCcredit_inputIcon.png",
      src: "assets/imgs/datum/corporateCcreditphoto.png",
      bigSrc: "assets/imgs/datum/big/corporateCcreditphotoBig.png"
    },
    JURIDICAL_PERSONS_CREDIT: {
      title: "法人征信",
      description: "法人征信",
      img: "assets/imgs/myData/basicsData/corporateCcredit.png",
      src: "assets/imgs/datum/corporateCcreditphoto.png",
      bigSrc: "assets/imgs/datum/big/corporateCcreditphotoBig.png"
    },
    JURIDICAL_PERSONS_SPOUSE_IDENTITY: {
      title: "法人配偶身份正面",
      description: "身份证正面",
      img: "",
      src: "assets/imgs/datum/ID_front_photo.png",
      bigSrc: "assets/imgs/datum/big/IDfrontphotoBig.png"
    },
    JURIDICAL_PERSONS_SPOUSE_IDENTITY_BACK: {
      title: "法人配偶身份反面",
      description: "身份证反面",
      img: "",
      src: "assets/imgs/datum/ID_back_photo.png",
      bigSrc: "assets/imgs/datum/big/IDbackphotoBig.png"
    },
    SUCCESSIVE_PAYMENT_CONTRACT: {
      title: "连续三年回款合同",
      description: "连续三年回款合同",
      img: "assets/imgs/myData/basicsData/contractphoto.png",
      src: "assets/imgs/datum/contractphoto.png",
      bigSrc: "assets/imgs/datum/big/contractphotoBig.png"
    },
    USER_OTHER_MATERIAL: {
      title: "其他证明",
      description: "其他证明",
      img: "assets/imgs/myData/basicsData/other_inputIcon.png",
      src: "assets/imgs/datum/otherphoto.png",
      bigSrc: "assets/imgs/datum/otherphoto.png"
    }
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
