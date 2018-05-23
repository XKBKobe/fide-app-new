import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {HttpApiService} from "../../../providers/HttpApiService";
import {MessageService} from "../../../providers/MessageService";
import {LoginPage} from "../../welcome/login";

@Component({
  selector: 'page-basic-info',
  templateUrl: 'basic-info.html'
})
export class BasicInfoPage {
  personData: any;
  status: any;

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public message: MessageService,
              public modalCtrl: ModalController) {


  }

  ionViewDidLoad() {
    this.http.post('getPersonalLoanStatus', {}, false).then(res => {
      this.status = res;
      console.log(res);
      this.getPersonInfo();
    })
  }

  getPersonInfo() {
    this.http.post('queryPersonalMaterial', {}).then(res => {
      this.personData = res;
      console.log(res);
    })
  }

  save() {
    let params = {
      name: this.personData.name,
      idNumber: this.personData.idNumber
    };
    this.http.post('editPersonalMaterial', params).then(res => {
      if (res) {
        this.message.showToastTop("基础信息保存成功");
        this.navCtrl.pop();
      }
    }, err => {
      if (err && err['respCode'] == 101604) {
        return this.modalCtrl.create(LoginPage).present();
      }
    });
  }
}
