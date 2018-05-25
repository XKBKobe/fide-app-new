import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import Swiper from 'swiper';
import {HttpApiService} from "../../providers/HttpApiService";
import {PerDataPage} from "./per-data/per-data";
import {BasDataPage} from "./bas-data/bas-data";
import {CreDataPage} from "./cre-data/cre-data";

@Component({
  selector: 'page-my-data',
  templateUrl: 'my-data.html'
})
export class MyDataPage {
  //信息配置
  personSetting: any;
  //个人资料
  perPercentage: any;
  //基础资料
  basPercentage: any;
  //信贷资料
  creDataPercentage: any;


  constructor(public navCtrl: NavController,
              public http: HttpApiService) {

  }

  ionViewDidEnter() {
    this.http.post('queryPersonalMaterialSetting', {}, false).then(res => {
      this.personSetting = res;
      this.getPercentage();
      this.getcrePercentage();
    });
  }

  ionViewDidLoad() {
    //配置swiper
    new Swiper('#swiper-container', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slideToClickedSlide: true,
      slidesPerView: 1.4,
      spaceBetween: 35,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }

  //个人资料
  goPer() {
    this.navCtrl.push(PerDataPage, {
      personSetting: JSON.parse(this.personSetting)
    })
  }

  //个人资料
  goBas() {
    this.navCtrl.push(BasDataPage, {
      personSetting: JSON.parse(this.personSetting)
    })
  }

  //信贷资料
  goCre() {
    this.navCtrl.push(CreDataPage, {
      personSetting: JSON.parse(this.personSetting)
    })
  }

  //获取个人资料/基础资料完整度
  getPercentage() {
    let that = this;
    let setting = JSON.parse(this.personSetting);
    let perSetting = [];
    let basicSetting = [];
    if (!!setting) {
      //个人资料
      if (setting['privateMat']) {
        perSetting = setting['privateMat'].split("|");
        perSetting = _.without(perSetting, "repaymentType");
        perSetting = _.without(perSetting, "purpose");
      }

      //基础资料
      if (setting['basicMat']) {
        basicSetting = setting['basicMat'].split("|");
      }

      that.http.post('queryPersonalMaterial', {}, false).then(result => {

        if (!!result) {
          //个人资料完整度
          let perPercentage = 0;
          //基础资料完整度
          let basPercentage = 0;

          //是否结婚 结婚照/配偶/配偶身份证照片
          if (result['marriage'] != 3 && result['marriage']) { //未婚（不等于3）没有结婚证，配偶，配偶身份证照片
            basicSetting = _.without(basicSetting, 'marriageLicense');
            basicSetting = _.without(basicSetting, '$marriageLicense');
            basicSetting = _.without(basicSetting, 'spouse');
            basicSetting = _.without(basicSetting, '$spouse');
            basicSetting = _.without(basicSetting, "spouseIdentityPic");
            basicSetting = _.without(basicSetting, "$spouseIdentityPic");
          }

          //是否购车 行驶证照片
          if (result['carProperty'] == 1 && result['carProperty']) { //没有购车（1）没有行驶证照片
            basicSetting = _.without(basicSetting, 'driverLicense');
            basicSetting = _.without(basicSetting, '$driverLicense');
          }

          //是否购房 住房证照片
          if (result['houseProperty'] == 1 && result['houseProperty']) { //没有购房（1）没有住房证照片
            basicSetting = _.without(basicSetting, 'houseProprietaryCertificate');
            basicSetting = _.without(basicSetting, '$houseProprietaryCertificate');
          }

          for (var key in perSetting) {
            let value = perSetting[key];
            if (value.indexOf("$") == 0) {
              value = value.slice(1);
            }
            //过滤掉因为身份证照片和反面是一致的
            if (value == 'identityPic' && result['identity'].matUrl && result['identityBack'].matUrl) {
              perPercentage++;
            } else {
              if (result[value]) {
                if (result[value] instanceof Array) {
                  let resultArr = result[value][0];
                  if (resultArr.matUrl) {
                    perPercentage++;
                  }
                } else {
                  if (result[value].matUrl !== undefined) {
                    if (result[value].matUrl) {
                      perPercentage++;
                    }
                  } else {
                    perPercentage++;
                  }
                }
              }
            }
          }

          //基础资料
          for (var key in basicSetting) {
            let value = basicSetting[key];
            if (value.indexOf("$") == 0) {
              value = value.slice(1);
            }
            if (value == 'marriageLicense' && result['marriage'] == 3 && result['marriageLicense'].matUrl) {//婚姻状况
              basPercentage++;
            } else if (value == 'driverLicense' && result['carProperty'] != 1 && result['driverLicense'].matUrl) { //行驶证情况
              basPercentage++;
            } else if (value == 'household' && result['householdZip']) { //户籍地址
              basPercentage++;
            } else if (value == 'companyAddress' && (result['companyAddressZip'] || result['companyAddress'])) { //单位地址
              basPercentage++;
            } else if (value == 'liveAddress' && (result['liveAddressZip'] || result['liveLoc'])) { //居住地址
              basPercentage++;
            } else if (value == 'manageAddress' && (result['manageZip'] || result['manageLoc'])) { //经营地址
              basPercentage++;
            } else if (value == 'companyAddress' && (result['companyAddressZip'] || result['companyAddress'])) { //单位地址
              basPercentage++;
            } else if (value == 'sharesIdentityPic' && result['sharesIdentity'].matUrl && result['sharesIdentityBack'].matUrl) {//股东身份证
              basPercentage++;
            } else if (value == 'spouseIdentityPic' && result['spouseIdentity'].matUrl && result['spouseIdentityBack'].matUrl) {//配偶身份证
              basPercentage++;
            } else if (value == 'juridicalPersonsIdentityPic' && result['juridicalPersonsIdentity'].matUrl && result['juridicalPersonsIdentityBack'].matUrl) {//法人身份证正反面
              basPercentage++;
            } else if (value == 'juridicalPersonsSpouseIdentityPic' && result['juridicalPersonsSpouseIdentity'].matUrl && result['juridicalPersonsSpouseIdentityBack'].matUrl) {//法人配偶身份证正反面
              basPercentage++;
            } else {
              if (result[value]) {
                if (result[value] instanceof Array) {
                  var resultArr = result[value][0];
                  if (resultArr.matUrl) {
                    basPercentage++;
                  }
                } else {
                  if (result[value].matUrl !== undefined) {
                    if (result[value].matUrl) {
                      basPercentage++;
                    }
                  } else if (value == 'spouse') { //配偶
                    if (!!result[value].education && !!result[value].idNumber && !!result[value].mobile && !!result[value].name && !!result[value].orgName && !!result[value].orgType) {
                      basPercentage++;
                    }
                  } else if (value == 'primaryContact' || value == 'secondaryContact') { //家庭联系人，第二联系人
                    if (!!result[value].mobile && !!result[value].name && !!result[value].relType) {
                      basPercentage++;
                    }
                  } else {
                    basPercentage++;
                  }
                }

              }
            }
          }

          that.perPercentage = perSetting.length ? (perPercentage / perSetting.length * 100).toFixed(0) : 0;
          that.basPercentage = basicSetting.length ? (basPercentage / basicSetting.length * 100).toFixed(0) : 0;

          console.log(that.perPercentage, that.basPercentage);
        }
      });
    }
  }

  //获取信贷资料完整度
  getcrePercentage() {
    let that = this;
    let creDatacentage = 0;
    let creDataSetting = [];
    let setting = JSON.parse(this.personSetting);
    if (!!setting) {
      //信贷资料
      if (!!setting['availableDataSource']) {
        creDataSetting = setting['availableDataSource'].split("|");
        that.http.post("isDataFill", {}).then(result => {
          if (!!result) {
            for (var i in result) {
              for (var j in creDataSetting) {
                if (i == creDataSetting[j] && result[i] > 0) {
                  creDatacentage++;
                }
              }
            }
            that.creDataPercentage = (creDatacentage / creDataSetting.length * 100).toFixed(0);
          } else {
            that.creDataPercentage = 0;
          }
        })
      }
    }
  }
}
