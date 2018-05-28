import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../../welcome/login";
import {HttpApiService} from "../../../../providers/HttpApiService";
import {MessageService} from "../../../../providers/MessageService";

@Component({
  selector: 'page-alipay',
  templateUrl: 'alipay.html'
})
export class AlipayPage {
  data: any = [];

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public message: MessageService,
              public modalCtrl: ModalController) {


  }

  ionViewDidLoad() {
    this.http.post("queryAccountByType", {acctType: 'ALIPAY'}).then(result => {
      this.data = result;
      console.log(result);
    })
  }
}
