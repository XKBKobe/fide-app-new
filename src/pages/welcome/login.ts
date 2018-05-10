import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {HttpApiService} from "../../providers/HttpApiService";
import {UtilsService} from "../../providers/UtilsService";
import {StorageService} from "../../providers/StorageService";
import {APPSTATUS} from "../../providers/BaseConfig";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public storage: StorageService,
              public utils: UtilsService) {


  }

  login() {
    let params = {
      "loginName": 18055417483,
      "password": this.utils.Md5('000000'),
      "sysSource": '1',
      "cid": ''
    };
    this.http.post('login', params).then(token => {
      console.log(token);
      this.storage.setItem(APPSTATUS.SUCCESS_TOKEN, token).then(data => {
        this.navCtrl.setRoot(TabsPage);
      });
    }, err => {
      console.log(err);
    });
  }
}
