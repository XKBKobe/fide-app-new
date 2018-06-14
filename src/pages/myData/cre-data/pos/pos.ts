import {Component} from '@angular/core';
import {Events, ModalController, NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../../welcome/login";
import {HttpApiService} from "../../../../providers/HttpApiService";
import {MessageService} from "../../../../providers/MessageService";
import {OpenUrlPage} from "../../../components/open-url/open-url";


@Component({
  selector: 'page-pos',
  templateUrl: 'pos.html'
})
export class PosPage {
  data: any = [];
  isPosList: boolean = false;
  accessToken: any;

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public message: MessageService,
              public modalCtrl: ModalController,
              public events: Events) {


  }


  ionViewDidLoad() {
    let that = this;
    this.http.post("queryAccountByType", {acctType: 'POS'}).then(result => {
      this.data = result;
    });

    that.events.subscribe("notifyResult", (data) => {
      if (!!data) {
        that.http.get("getNotifyResult", {"accesstoken": that.accessToken}, false).then(res => {
        }, err => {
          if (err && err['respCode'] == 101604) {
          }
        })
      }
    });
  }

  addPos() {
    this.isPosList = true;
  }

  openUrl(type) {
    this.http.get('getDatagUrl', {kind: type}).then(data => {
      let url = data['redirectUrl'];
      this.accessToken = data['accesstoken'];
      url && this.accessToken && this.navCtrl.push(OpenUrlPage, {
        title: '绑定POS账户',
        url: url
      }, {}, data => {
        console.log(data);
        this.isPosList = false;
      });
    })
  }
}
