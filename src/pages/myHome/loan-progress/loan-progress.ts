import {Component} from '@angular/core';
import {Events, ModalController, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../../welcome/login";
import {HttpApiService} from "../../../providers/HttpApiService";
import {CommonService} from "../../../providers/commonService";
import {PERSON_DATA} from "../../../providers/BaseConfig";
import {DataSaveService} from "../../../providers/DataSaveService";

@Component({
  selector: 'page-loan-progress',
  templateUrl: 'loan-progress.html'
})
export class LoanProgress {
  page: number = 1;
  product: any;

  //贷款步骤
  loanStep: any = {
    step1: false, //身份核实
    step2: true, //个人资料
    step3: true, //基础资料
    step4: true, //信贷资料
    step5: false  //在线申请（是否贷款申请流程中）
  };

  personData: any;

  step2Set: any; //个人资料显示

  step3Set: any; //基础资料显示

  step4Set: any; //信贷资料

  constructor(public navCtrl: NavController,
              public events: Events,
              public navParams: NavParams,
              public http: HttpApiService,
              public modalCtrl: ModalController,
              public comm: CommonService,
              public dataSave: DataSaveService) {
    this.product = navParams.get('product');
  }

  ionViewDidLoad() {
    //检测核身信息
    this.http.post('getPersonalLoanStatus', {}).then(res => {
      res['checkIdentity'] == 1 || res['checkIdentity'] == 0 ? this.loanStep.step1 = true : this.loanStep.step1 = false;
      this.loanStep.step5 = res['hasApplying'];
      //设置推荐码
      this.dataSave.setCmCode(res['hasApplying']);
      console.log(this.loanStep);
    }, err => {
      if (err && err['respCode'] == 101604) {
        localStorage.clear();
        this.modalCtrl.create(LoginPage).present();
        return false;
      }
    });

    this.queryMaterial();
  }

  ionViewDidLeave() {
    //取消订阅事件
    this.events.unsubscribe('nextToPage');
  }

  //查询个人资料
  queryMaterial() {
    this.http.post('queryPersonalMaterial', {}, false).then(data => {
      this.personData = data;
      //检查个人资料
      this.checkStepTwo(data);
      //检查基础资料
      this.checkStepThree(data);
      //检查信贷资料
      this.checkStepFour();

    }, err => {
      if (err && err['respCode'] == 101604) {
        localStorage.clear();
        this.modalCtrl.create(LoginPage).present();
        return false;
      }
    })
  }


  //检查个人资料
  checkStepTwo(data) {
    let that = this;
    let stepTwoSetting = that.product.privateMat;
    this.comm.checkMaterial(data, stepTwoSetting, 'step2', data => {
      //个人资料配置
      that.step2Set = data;
      let personalAllData = that.personData;
      for (let i in data) {
        if (data[i].isRequire) {
          if (i == 'identityPic') {
            if (!!personalAllData["identity"].matUrl && !!personalAllData["identityBack"].matUrl) {
              continue;
            } else {
              that.loanStep.step2 = false;
            }
          } else {
            if (!!personalAllData[i]) {
              continue;
            } else {
              that.loanStep.step2 = true;
            }
          }
        }
      }
    });
  }

  //检查基础资料
  checkStepThree(data) {
    let that = this;
    let stepThreeSetting = that.product.basicMat;
    this.comm.checkMaterial(data, stepThreeSetting, 'step3', data => {
      //基础资料配置
      that.step3Set = data;
      let personalAllData = that.personData;
      for (let i in data) {
        if (data[i].isRequire) {
          if (personalAllData[i] instanceof Array) {
            if ((i == 'houseProprietaryCertificate' && personalAllData['houseProperty'] == 1) || (i == 'houseProprietaryCertificate' && !personalAllData['houseProperty'])) { //房产证照片 和有没有房产有依附关系 (1表示没有房产)
              continue;
            } else {
              if (!!personalAllData[i][0].matUrl) {
                continue;
              } else {
                that.loanStep.step3 = false;
              }
            }
          } else if (i == 'merchant') { //受托商家 todo
            //获取产品信息
            if (that.product['merchantUuid'] || that.product['preLoanMerchantUuid']) {
              continue;
            } else {
              that.loanStep.step3 = false;
            }
          } else if (i == 'driverLicense') { //驾驶证
            if (personalAllData['carProperty'] == 1 || !personalAllData['carProperty']) { //没有汽车
              continue;
            } else {
              if (!!personalAllData["driverLicense"].matUrl) {
                continue;
              } else {
                that.loanStep.step3 = false;
              }
            }
          } else if (i == 'spouse') { //配偶信息  选择未婚丧偶离婚 配偶信息不考虑
            if (personalAllData['marriage'] != 3) { //3为已婚
              continue;
            } else { //已婚姻并且必填
              if (!!personalAllData[i] && personalAllData[i].name && personalAllData[i].idNumber && personalAllData[i].orgName && personalAllData[i].education && personalAllData[i].orgType) {
                continue;
              } else {
                that.loanStep.step3 = false;
              }
            }
          } else if (i == 'marriageLicense') { //结婚证  选择未婚丧偶离婚 配偶信息不考虑
            if (personalAllData['marriage'] != 3) { //3为已婚
              continue;
            } else { //已婚姻并且必填
              if (!!personalAllData[i].matUrl) {
                continue;
              } else {
                that.loanStep.step3 = false;
              }
            }
          } else if (i == 'diploma') { //学位证照片
            if (!!personalAllData[i].matUrl) {
              continue;
            } else {
              that.loanStep.step3 = false;
            }
          } else if (i == 'primaryContact' || i == 'secondaryContact') { //第一第二联系人
            if (!!personalAllData[i] && !!personalAllData[i].mobile && !!personalAllData[i].name && !!personalAllData[i].relType) {
              continue;
            } else {
              that.loanStep.step3 = false;
            }
          } else if (i == 'sharesIdentityPic') { // 股东身份证照片
            if (!!personalAllData["sharesIdentity"].matUrl && !!personalAllData["sharesIdentityBack"].matUrl) {
              continue;
            } else {
              that.loanStep.step3 = false;
            }
          } else if (i == 'juridicalPersonsIdentityPic') { //法人身份证
            if (!!personalAllData["juridicalPersonsIdentity"].matUrl && !!personalAllData["juridicalPersonsIdentityBack"].matUrl) {
              continue;
            } else {
              that.loanStep.step3 = false;
            }
          } else if (i == 'juridicalPersonsSpouseIdentityPic') { //法人配偶
            if (!!personalAllData["juridicalPersonsSpouseIdentity"].matUrl && !!personalAllData["juridicalPersonsSpouseIdentityBack"].matUrl) {
              continue;
            } else {
              that.loanStep.step3 = false;
            }
          } else if (i == 'liveAddress') { //居住地址
            if (!!personalAllData["liveZip"] && !!personalAllData["liveLoc"]) {
              continue;
            } else {
              that.loanStep.step3 = false;
            }
          } else if (i == 'companyAddress') { //单位地址
            if (!!personalAllData['companyAddressZip'] && !!personalAllData['companyAddress']) {
              continue;
            } else {
              that.loanStep.step3 = false;
            }
          } else if (i == 'manageAddress') { //经营地址
            if (!!personalAllData['manageZip'] && !!personalAllData['manageLoc']) {
              continue;
            } else {
              that.loanStep.step3 = false;
            }
          } else if (i == 'houseAddress') { //房产地址  5.1.0 todo
            if (!!personalAllData['houseZip'] && !!personalAllData['houseLoc']) {
              continue;
            } else {
              that.loanStep.step3 = false;
            }
          } else if (i == 'household') { //户籍
            if (!!personalAllData['householdZip']) {
              continue;
            } else {
              that.loanStep.step3 = false;
            }
          } else {
            if (!!personalAllData[i]) {
              continue;
            } else {
              that.loanStep.step3 = false;
            }
          }
        }
      }
    });
  }

  //检查信贷资料
  checkStepFour() {
    let that = this;
    let stepFourSetting = that.product.dataSource;
    //查询信贷资料的数目
    that.http.post('isDataFill', {}).then(res => {
      that.comm.checkMaterial('', stepFourSetting, 'step4', data => {
        that.step4Set = data;
        for (let i in data) {
          if (data[i].isRequire) {
            if (data[i].num != 0) {
              continue;
            } else {
              that.loanStep.step4 = false;
            }
          }
        }
      });
    });
  }

  //头部点击 output
  skipToPage(page) {
    this.page = page;
    console.log('定义头部 ' + page);
  }

  //下一步点击 output
  nextToPage(page) {
    this.page = page;
    console.log('下一步 ' + page);
    this.events.publish("nextToPage", page);
  }

  outStep(step) {
    console.log('1333333333');
    console.log(step.step);

    this.loanStep[step.step] = step.status;
  }
}
