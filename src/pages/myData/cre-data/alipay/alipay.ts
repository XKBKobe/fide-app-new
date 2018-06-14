import {Component} from '@angular/core';
import {Events, ModalController, NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../../welcome/login";
import {HttpApiService} from "../../../../providers/HttpApiService";
import {MessageService} from "../../../../providers/MessageService";
import {OpenUrlPage} from "../../../components/open-url/open-url";

@Component({
  selector: 'page-alipay',
  templateUrl: 'alipay.html'
})
export class AlipayPage {
  data: any = [];
  accessToken: any;

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public message: MessageService,
              public modalCtrl: ModalController,
              public events: Events) {


  }

  ionViewDidLoad() {
    let that = this;
    that.http.post("queryAccountByType", {acctType: 'ALIPAY'}).then(result => {
      that.data = result;
    });
    that.events.subscribe("notifyResult", (data) => {
      console.log('notifyResultAlipay ', data);
      if (!!data) {
        that.http.get("getNotifyResult", {"accesstoken": this.accessToken}, false).then(res => {
        }, err => {
          if (err && err['respCode'] == 101604) {
          }
        })
      }
    });
  }


  openUrl() {
    this.http.get('getDatagUrl', {kind: 'alipay'}).then(data => {
      let url = data['redirectUrl'];
      this.accessToken = data['accesstoken'];
      url && this.accessToken && this.navCtrl.push(OpenUrlPage, {
        title: '绑定支付宝账户',
        url: url
      });
    })
  }
}
