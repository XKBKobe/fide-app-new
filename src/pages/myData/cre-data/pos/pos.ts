import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
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


  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public message: MessageService,
              public modalCtrl: ModalController) {


  }

  ionViewDidLoad() {
    this.http.post("queryAccountByType", {acctType: 'POS'}).then(result => {
      this.data = result;
      console.log(result);
    })
  }

  addPos() {
    this.isPosList = true;
  }

  openUrl(type) {
    this.http.get('getDatagUrl', {kind: type}).then(data => {
      let url = data['redirectUrl'];
      let accessToken = data['accesstoken'];
      url && accessToken && this.navCtrl.push(OpenUrlPage, {
        title: '绑定POS账户',
        url: url
      },{},data =>{
        console.log(data);
        this.isPosList = false;
      });
    })
  }
}
