import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpApiService} from "../../../../providers/HttpApiService";
import {MessageService} from "../../../../providers/MessageService";
import {DataSaveService} from "../../../../providers/DataSaveService";

@Component({
  selector: 'page-loan-step-two',
  templateUrl: 'loan-step-two.html'
})
export class LoanStepTwoPage {
  //贷款步骤
  @Input('loanStep') loanStep: any;
  //个人信息配置
  @Input('step2Set') step2Set: any;
  //点击跳转到指定界面
  @Output() nextToPage: EventEmitter<number> = new EventEmitter<number>();
  //step反馈
  @Output() outStep: EventEmitter<any> = new EventEmitter<any>();
  //个人信息
  personData: any;

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public message: MessageService,
              public dataSave: DataSaveService) {

  }

  ngOnInit() {
    //查询个人资料
    this.http.post('queryPersonalMaterial', {}, false).then(data => {
      this.personData = data;
    });
  }

  next() {
    let that = this;
    if (!!that.step2Set) {
      for (let i in that.step2Set) {
        let person = that.step2Set[i];
        if (person.isRequire) {
          if (i == 'identityPic') {
            if (!!that.personData["identity"]['matUrl'] && !!that.personData["identityBack"]['matUrl']) {
              continue;
            } else {
              that.message.presentAlert(person.requireText);
              return false;
            }
          } else if (i == 'applyAmount') {
            let applyAmount = that.personData.applyAmount;
            if (applyAmount == null || applyAmount == "" || applyAmount == 0) {
              that.message.presentAlert(person.requireText);
              return false;
            }
            if (!that.checkPerWantLoan(applyAmount)) {
              that.message.presentAlert("意向额度仅可保留小数点后1位");
              return false;
            }
          } else {
            if (!!that.personData[i]) {
              continue
            } else {
              that.message.presentAlert(person.requireText);
              return false;
            }
          }
        }
      }
    }

    let para = {
      name: that.personData.name,
      idNumber: that.personData.idNumber,
      applyAmount: that.personData.applyAmount,
      repaymentType: that.personData.repaymentType,
      purpose: that.personData.purpose
    };

    that.http.post("editPersonalMaterial", para).then(res => {
      //保存purpose
      that.dataSave.setPurpose(that.personData.purpose);
      that.message.showToastTop('个人资料保存成功');
      that.outStep.emit({step: 'step2', status: true});
      //贷款未申请
      if (!that.loanStep.step5) {
        that.nextToPage.emit(3);
      }
    });
  }

  checkPerWantLoan(num) {
    var flag = true;
    if (!isNaN(num)) {
      if (num < 0) {
        flag = false;
      }
      var numS = new String(num)
      var dot = numS.indexOf(".");
      if (dot != -1) {
        var dotCnt = numS.substring(dot + 1, num.length);
        if (dotCnt.length > 1) {
          flag = false;
        }
      }
    } else {
      flag = false;
    }
    return flag;
  }
}
