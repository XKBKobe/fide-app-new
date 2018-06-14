import {Component} from '@angular/core';
import {Events, ModalController, NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../../welcome/login";
import {HttpApiService} from "../../../../providers/HttpApiService";
import {MessageService} from "../../../../providers/MessageService";
import {BASIC_SETTINGS_JSON} from "../../../../providers/BaseConfig";
import {OpenUrlPage} from "../../../components/open-url/open-url";


@Component({
  selector: 'page-bank',
  templateUrl: 'bank.html'
})
export class BankPage {
  data: any = [];
  bankList: any = [];
  fideStatic: any;
  isBankList: boolean = false;
  accessToken: any;


  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public message: MessageService,
              public modalCtrl: ModalController,
              public events: Events) {


  }


  ionViewDidLoad() {
    let that = this;
    that.fideStatic = BASIC_SETTINGS_JSON.fideStatic;
    that.http.post("queryAccountByType", {acctType: 'BANK_CARD'}).then(result => {
      that.data = result;
    });

    that.events.subscribe("notifyResult", (data) => {
      console.log('notifyResultAlipay ', data);
      if (!!data) {
        that.http.get("getNotifyResult", {"accesstoken": that.accessToken}, false).then(res => {
        }, err => {
          if (err && err['respCode'] == 101604) {
          }
        })
      }
    });
  }


  addBank() {
    this.http.post("getOrgBankInfo4App", {}).then(result => {
      this.bankList = result;
      this.isBankList = true;
      console.log(result);
    })
  }

  openUrl(type) {
    this.http.get('getDatagUrl', {kind: type}).then(data => {
      let url = data['redirectUrl'];
      this.accessToken = data['accesstoken'];
      url && this.accessToken && this.navCtrl.push(OpenUrlPage, {
        title: '绑定银行卡账户',
        url: url
      }, {}, data => {
        console.log(data);
        this.isBankList = false;
      });
    })
  }
}
