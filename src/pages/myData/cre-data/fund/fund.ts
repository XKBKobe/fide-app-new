import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../../welcome/login";
import {HttpApiService} from "../../../../providers/HttpApiService";
import {MessageService} from "../../../../providers/MessageService";
import {OpenUrlPage} from "../../../components/open-url/open-url";


@Component({
  selector: 'page-fund',
  templateUrl: 'fund.html'
})
export class FundPage {
  data: any = [];

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public message: MessageService,
              public modalCtrl: ModalController) {


  }

  ionViewDidLoad() {
    this.http.post("queryAccountByType", {acctType: 'ACCUMULATIONFUND'}).then(result => {
      this.data = result;
    })
  }

  openUrl(){
    this.http.get('getDatagUrl', {kind: 'gjj'}).then(data => {
      let url = data['redirectUrl'];
      let accessToken = data['accesstoken'];
      url && accessToken && this.navCtrl.push(OpenUrlPage, {
        title: '绑定公积金账户',
        url: url
      });
    })
  }
}
