import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
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


  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public message: MessageService,
              public modalCtrl: ModalController) {


  }

  ionViewDidLoad() {
    this.fideStatic = BASIC_SETTINGS_JSON.fideStatic;
    this.http.post("queryAccountByType", {acctType: 'BANK_CARD'}).then(result => {
      this.data = result;
      console.log(result);
    })
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
      let accessToken = data['accesstoken'];
      url && accessToken && this.navCtrl.push(OpenUrlPage, {
        title: '绑定银行卡账户',
        url: url
      },{},data =>{
        console.log(data);
        this.isBankList = false;
      });
    })
  }
}
