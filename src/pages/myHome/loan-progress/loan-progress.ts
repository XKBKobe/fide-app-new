import {Component} from '@angular/core';
import {Events, ModalController, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../../welcome/login";
import {HttpApiService} from "../../../providers/HttpApiService";

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
    step2: false, //个人资料
    step3: false, //基础资料
    step4: false, //信贷资料
    step5: false  //在线申请（是否贷款申请流程中）
  };

  constructor(public navCtrl: NavController,
              public events: Events,
              public navParams: NavParams,
              public http: HttpApiService,
              public modalCtrl: ModalController) {
    this.product = navParams.get('product');
  }

  ionViewDidLoad() {
    //检测核身信息
    this.http.post('getPersonalLoanStatus', {}).then(res => {
      res['checkIdentity'] == 1 || res['checkIdentity'] == 0 ? this.loanStep.step1 = true : this.loanStep.step1 = false;
      this.loanStep.step5 = res['hasApplying'];
      console.log(this.loanStep);
    }, err => {
      if (err && err['respCode'] == 101604) {
        localStorage.clear();
        this.modalCtrl.create(LoginPage).present();
        return false;
      }
    })
  }

  ionViewDidLeave() {
    //取消订阅事件
    this.events.unsubscribe('nextToPage');
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


}
