import {Component} from '@angular/core';
import {Events, ModalController, NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../../welcome/login";
import {HttpApiService} from "../../../../providers/HttpApiService";
import {MessageService} from "../../../../providers/MessageService";
import {OpenUrlPage} from "../../../components/open-url/open-url";


@Component({
  selector: 'page-oto',
  templateUrl: 'oto.html'
})
export class OtoPage {
  data: any = [];
  isOtoList: boolean = false;
  accessToken: any;

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public message: MessageService,
              public modalCtrl: ModalController,
              public events: Events) {


  }

  ionViewDidLoad() {
    let that = this;
    this.http.post("queryAccountByType", {acctType: 'OTO'}).then(result => {
      this.data = result;
      console.log(result);
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

  addOto() {
    this.isOtoList = true;
  }

  openUrl(type) {
    this.http.get('getDatagUrl', {kind: type}).then(data => {
      let url = data['redirectUrl'];
      this.accessToken = data['accesstoken'];
      url && this.accessToken && this.navCtrl.push(OpenUrlPage, {
        title: '绑定外卖团购账户',
        url: url
      }, {}, data => {
        console.log(data);
        this.isOtoList = false;
      });
    })
  }
}
