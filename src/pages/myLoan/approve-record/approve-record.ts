import {Component} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {HttpApiService} from "../../../providers/HttpApiService";
import {CommonService} from "../../../providers/commonService";
import {LoginPage} from "../../welcome/login";

@Component({
  selector: 'page-approve-record',
  templateUrl: 'approve-record.html'
})
export class ApproveRecordPage {
  //我的申请
  applyLog: any;
  data: any;

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public navParams: NavParams,
              public comm: CommonService,
              public modalCtrl: ModalController) {
    this.applyLog = navParams.get('applyLog');
  }

  ionViewDidLoad() {
    this.http.post('queryLoanLog', {loanAppUuid: this.applyLog['loanAppUuid']}).then(res => {
      console.log(res);
      this.data = res;
    }, err => {
      if (err && err['respCode'] == 101604) {
        localStorage.clear();
        this.modalCtrl.create(LoginPage).present();
        return false;
      }
    })
  }

  call(event) {
    event.stopPropagation();
    // todo  拨打电话
  }
}
