import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpApiService} from "../../../../providers/HttpApiService";
import {MessageService} from "../../../../providers/MessageService";
import {UtilsService} from "../../../../providers/UtilsService";
import {CITY_DATA} from "../../../../providers/BaseConfig";

@Component({
  selector: 'page-loan-step-three',
  templateUrl: 'loan-step-three.html'
})
export class LoanStepThreePage {
  //贷款步骤
  @Input('step3Set') step3Set: any;
  //点击跳转到指定界面
  @Output() nextToPage: EventEmitter<number> = new EventEmitter<number>();
  //step反馈
  @Output() outStep: EventEmitter<any> = new EventEmitter<any>();
  //基础资料
  personData: any;
  //城市数据
  cityData: any = CITY_DATA;

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public message: MessageService,
              public utils: UtilsService) {
  }

  ngOnInit() {
    //查询个人资料
    this.http.post('queryPersonalMaterial', {}, false).then(data => {

      this.personData = data;
    });
  }

  next() {
    let that = this;
    //必填项
    if (!that.checkStep3()) return;

    //检验邮箱格式
    var mail = that.personData.email;
    if (!that.utils.checkEmail(mail)) {
      return that.message.presentAlert('您的电子邮箱格式不正确');
    }

    //检验联系人电话
    var firMobile = that.personData['primaryContact.mobile'];
    var secMobile = that.personData['secondaryContact.mobile'];
    if (firMobile != "" && firMobile != undefined && !that.utils.checkTelOrMobile(firMobile)) {
      return that.message.presentAlert('您的家庭联系人电话格式不正确');
    }
    if (secMobile != "" && secMobile != undefined && !that.utils.checkTelOrMobile(secMobile)) {
      return that.message.presentAlert('您的第二联系人电话格式不正确');
    }

    //校验住宅地址邮编
    var houseAddressZipCode = that.personData.houseAddressZipCode;
    if (houseAddressZipCode != "" && houseAddressZipCode != undefined && !that.utils.checkhouseCode(houseAddressZipCode)) {
      return that.message.presentAlert('您的住宅地址邮编格式不正确');
    }

    //电费用户名
    var electricityAccountName = that.personData.electricityAccountName;
    var nameReg = /^[\u4E00-\u9FA5]+$/;
    if (!!electricityAccountName) {
      if (nameReg.test(electricityAccountName)) {
        if (electricityAccountName.length < 2) {
          return that.message.presentAlert("姓名不能少于两位");
        }
        if (electricityAccountName.length > 15) {
          return that.message.presentAlert("姓名不能多于15位");
        }
      } else {
        if (/\s+/.test(electricityAccountName)) {
          return that.message.presentAlert("姓名不能包含空格");
        } else {
          return that.message.presentAlert("请输入中文姓名");
        }
      }
    }

    //单位地址邮编
    var companyAddressZipCode = that.personData.companyAddressZipCode;
    if (companyAddressZipCode != "" && companyAddressZipCode != undefined && !that.utils.checkhouseCode(companyAddressZipCode)) {
      return that.message.presentAlert('您的单位地址邮编格式不正确');
    }

    //单位电话
    var workPhone = that.personData.workTelephone;
    if (workPhone != "" && workPhone != undefined && !that.utils.checkTelOrMobile(workPhone)) {
      return that.message.presentAlert('您的单位电话格式不正确');
    }

    //检验配偶身份证号码
    var spouseId = this.personData['spouse.idNumber'];
    if (spouseId != "" && spouseId != undefined && !this.utils.checkIdNumber(spouseId)) {
      return;
    }

    //检验配偶手机号码
    var spouseMobile = that.personData['spouse.mobile'];
    if (spouseMobile != "" && spouseMobile != undefined && !that.utils.checkTelOrMobile(spouseMobile)) {
      return that.message.presentAlert('您的单位电话格式不正确');
    }

    //检验银行卡号是否为16位或19位数字
    var bankId = that.personData.cardNumber;
    var reg = /^(\d{16}|\d{19})$/;
    if (bankId != "" && bankId != undefined && !reg.test(bankId)) {
      return that.message.presentAlert('请输入16位或19位数字的银行卡号');
    }

    //检查资料
    let params = that.checkStepData();
    that.http.post("editPersonalMaterial", params).then(res => {
      that.message.showToastTop('基础资料保存成功');
      that.outStep.emit({step: 'step3', status: true});
      that.nextToPage.emit(4);
    });
  }

  //检查基础资料步骤
  checkStepData() {
    let _data = {};
    let personData = this.personData;
    for (var key in personData) {
      if (key == "primaryContact") { //家庭联系人信息
        _data['primaryContact.name'] = personData.primaryContact.name;
        _data['primaryContact.mobile'] = personData.primaryContact.mobile;
        _data['primaryContact.relType'] = personData.primaryContact.relType;
      } else if (key == "secondaryContact") { //第二联系人信息
        _data['secondaryContact.name'] = personData.secondaryContact.name;
        _data['secondaryContact.mobile'] = personData.secondaryContact.mobile;
        _data['secondaryContact.relType'] = personData.secondaryContact.relType;
      } else if (key == "spouse") { //配偶信息
        if (_data['marriage'] != 3) { //不是已婚
          _data['spouse.name'] = null;
          _data['spouse.idNumber'] = null;
          _data['spouse.mobile'] = null;
          _data['spouse.orgName'] = null;
          _data['spouse.education'] = null;
          _data['spouse.orgType'] = null;
        } else {
          _data['spouse.name'] = personData.spouse.name;
          _data['spouse.idNumber'] = personData.spouse.idNumber;
          _data['spouse.mobile'] = personData.spouse.mobile;
          _data['spouse.orgName'] = personData.spouse.orgName;
          _data['spouse.education'] = personData.spouse.education;
          _data['spouse.orgType'] = personData.spouse.orgType;
        }
      } else {
        _data[key] = personData[key];
      }
    }
    return _data;
  }

  //检测基础资料的必填信息
  checkStep3() {
    let that = this;
    let personData = this.personData;
    if (!!that.step3Set) {
      for (let i in that.step3Set) {
        let person = that.step3Set[i];
        if (person.isRequire) {
          if (personData[i] instanceof Array) { //照片为数组
            if ((i == 'houseProprietaryCertificate' && personData['houseProperty'] == 1) || (i == 'houseProprietaryCertificate' && !personData['houseProperty'])) { //房产证照片 (1表示没有房产)不校验房产证照片
              continue;
            } else {
              if (!!personData[i][0].matUrl) {
                continue;
              } else {
                that.message.presentAlert(person.requireText);
                return false;
              }
            }
          } else if (i == 'merchant') { //受托支付 todo


          } else if (i == 'driverLicense') { //车辆和行驶证照片 1：没有汽车
            if (personData['carProperty'] == 1 || !personData['carProperty']) { //没有汽车
              continue;
            } else {
              if (!!personData["driverLicense"].matUrl) {
                continue;
              } else {
                that.message.presentAlert(person.requireText);
                return false;
              }
            }
          } else if (i == 'spouse') { //配偶信息  选择未婚丧偶离婚 配偶信息不考虑
            if (personData['marriage'] != 3) { //3为已婚
              continue;
            } else { //已婚姻并且必填
              if (!!personData[i] && personData[i].name && personData[i].idNumber && personData[i].orgName && personData[i].education && personData[i].orgType) {
                //姓名的校验
                if (!that.utils.checkName(personData[i].name)) {
                  return false;
                }
                //姓名的校验
                if (!that.utils.checkIdNumber(personData[i].idNumber)) {
                  return false;
                }
                continue;
              } else {
                that.message.presentAlert(person.requireText);
                return false;
              }
            }
          } else if (i == 'marriageLicense') { //结婚证  选择未婚丧偶离婚 配偶信息不考虑
            if (personData['marriage'] != 3) { //3为已婚
              continue;
            } else { //已婚姻并且必填
              if (!!personData[i].matUrl) {
                continue;
              } else {
                that.message.presentAlert(person.requireText);
                return false;
              }
            }
          } else if (i == 'diploma') {  //学历学位证  todo 照片是单张的
            if (!!personData[i].matUrl) {
              continue;
            } else {
              that.message.presentAlert(person.requireText);
              return false;
            }
          } else if (i == 'primaryContact' || i == 'secondaryContact') { //第一第二联系人
            if (!!personData[i]['mobile'] && !!personData[i]['name'] && !!personData[i]['relType']) {
              continue;
            } else {
              that.message.presentAlert(person.requireText);
              return false;
            }
          } else if (i == 'spouseIdentityPic') { //配偶身份证照片
            if (personData['marriage'] != 3) { //3为已婚
              continue;
            } else { //已婚姻并且必填
              if (!!personData["spouseIdentity"].matUrl && !!personData["spouseIdentityBack"].matUrl) {
                continue;
              } else {
                that.message.presentAlert(person.requireText);
                return false;
              }
            } //sharesIdentityPic:股东身份证照片 juridicalPersonsIdentityPic:法人身份证  juridicalPersonsSpouseIdentityPic:法人配偶
          } else if (i == 'sharesIdentityPic' || i == 'juridicalPersonsIdentityPic' || i == 'juridicalPersonsSpouseIdentityPic') {
            let type = i.substring(0, i.length - 3);
            if (!!personData[type].matUrl && !!personData[type + "Back"].matUrl) {
              continue;
            } else {
              that.message.presentAlert(person.requireText);
              return false;
            }
          } else if (i == 'liveAddress' || i == 'companyAddress' || i == 'manageAddress') { //liveAddress:居住地址 companyAddress:单位地址 manageAddress:经营地址
            let type = i.substring(0, i.length - 7);
            if (!!personData[type + 'Zip'] && !!personData[type + 'Loc']) {
              continue;
            } else {
              that.message.presentAlert(person.requireText);
              return false;
            }
          } else if (i == 'household') { //户籍 只有一个选择框
            if (!!personData['householdZip']) {
              continue;
            } else {
              that.message.presentAlert(person.requireText);
              return false;
            }
          } else {
            if (!!personData[i]) {
              continue;
            } else {
              that.message.presentAlert(person.requireText);
              return false;
            }
          }
        }
      }
    }
    return true;
  }
}
