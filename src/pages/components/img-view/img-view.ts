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

  description: any;
  class: any;
  bigsrc: any;
  title: any;
  src: any;
  color: any;

  uploadDisabled: boolean = false;

  setJson: any = {
    "USER_IDENTITY": {
      "title": "身份证正面",
      "description": "身份证正面",
      "icon": "icon-sfz",
      "src": "assets/image/datum/ID_front_photo.png",
      "bigsrc": "assets/image/datum/big/IDfrontphotoBig.png",
      "class": "",
      "color": ""
    },
    "USER_IDENTITY_BACK": {
      "title": "身份证反面",
      "description": "身份证反面",
      "icon": "icon-sfz",
      "src": "assets/image/datum/ID_back_photo.png",
      "bigsrc": "assets/image/datum/big/IDbackphotoBig.png",
      "class": "",
      "color": ""
    }
  };

  constructor(public navCtrl: NavController) {

  }


  ngOnInit() {
    // let type = this.imgData.matTypeCode;
    // this.title = this.setJson[type].title;
    // this.icon = this.setJson[type].icon;
    // this.class = this.setJson[type].class;
    // this.description = this.setJson[type].description;
    // this.color = this.setJson[type].color;
    // this.src = this.imgData.matUrl ? this.imgData.matUrl + "&w=200&h=100" : '';
    // this.bigsrc = this.imgData.matUrl;
    // this.uploadDisabled = this.uploadPicStatus;
    // if (!this.src) {
    //   this.src = this.setJson[type].src;
    //   this.bigsrc = this.setJson[type].bigsrc;
    // }
  }
}
