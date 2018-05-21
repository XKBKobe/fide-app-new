import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {LoginPage} from "../welcome/login";
import {HttpApiService} from "../../providers/HttpApiService";
import {ApproveRecordPage} from "./approve-record/approve-record";

@Component({
  selector: 'page-my-loan',
  templateUrl: 'my-loan.html'
})
export class MyLoanPage {
  data: any;

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public modalCtrl: ModalController) {

  }

  ionViewDidEnter() {
    this.getMyLoans();
  }

  getMyLoans(refresher?) {
    this.http.post('myLoans', {}).then(res => {
      console.log(res);
      this.data = res;
      refresher && refresher.complete();
    }, err => {
      if (err && err['respCode'] == 101604) {
        localStorage.clear();
        this.modalCtrl.create(LoginPage).present();
        return false;
      }
      refresher && refresher.complete();
    })
  }

  refresh(refresher) {
    this.getMyLoans(refresher);
  }

  goRecord(item) {
    this.navCtrl.push(ApproveRecordPage, {
      applyLog: item
    })
  }
}
