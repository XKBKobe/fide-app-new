import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpApiService} from "../../../../providers/HttpApiService";
import {UtilsService} from "../../../../providers/UtilsService";
import {MessageService} from "../../../../providers/MessageService";

@Component({
  selector: 'page-add-bank',
  templateUrl: 'add-bank.html'
})
export class AddBankPage {
  addBank: { name?: any, idNumber?: any, bankNum?: any, mobile?: any } = {
    name: null,
    idNumber: null,
    bankNum: null,
    mobile: null,
  };

  //个人信息
  personData: any;
  perDisabled: boolean = false;
  btnDisabled: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpApiService,
              public util: UtilsService,
              public message: MessageService) {
  }

  ionViewDidLoad() {
    this.http.post("getPersonalLoanStatus", {}, false).then(result => {
      if (!!result) {
        //获取个人信息
        this.http.post("queryPersonalMaterial", {}).then(res => {
          this.personData = res;

          if (res['name'] && res['idNumber']) {
            this.addBank.name = res['name'];
            this.addBank.idNumber = res['idNumber'];
          }
          if (result['checkIdentity'] == "1") {
            this.perDisabled = true;
          } else {
            this.perDisabled = false;
          }
        })
      }
    })
  }

  submit() {
    let that = this;
    let name = that.addBank.name;
    let idNumber = that.addBank.idNumber;
    let bankNum = that.addBank.bankNum;
    let mobile = that.addBank.mobile;

    //姓名的校验
    if (!that.util.checkName(name)) return;

    //身份证的校验
    if (!that.util.checkIdNumber(idNumber)) return;

    //银行卡的校验
    if (!that.util.checkBankNum(bankNum)) return;

    //手机号校验
    if (!that.util.checkMobile(mobile)) return;


    var params = {
      "userUuid": localStorage.getItem('userUuid'),
      "userName": name,
      "userIdNumber": idNumber,
      "accountNo": bankNum,
      "bankPreMobile": mobile
    };

    that.btnDisabled = true;
    that.http.post("signPersonalCreditForWx", params).then(res => {
      that.message.showToastTop("个人征信签约成功");
      that.popCustom();
    }, err => {
      // todo
      that.btnDisabled = false;
    })
  }

  popCustom() {
    let that = this;
    let startIndex = that.navCtrl.getActive().index - 1;
    //page 2 删除的页数
    that.navCtrl.remove(startIndex, 1);
    let time = setTimeout(function () {
      that.btnDisabled = false;
      clearTimeout(time);
      that.navCtrl.pop();
    }, 2000)
  }
}
