import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {HttpApiService} from "../../providers/HttpApiService";
import {UtilsService} from "../../providers/UtilsService";
import {APPSTATUS} from "../../providers/BaseConfig";
import {StorageService} from "../../providers/StorageService";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  account: { accNum?: any, pass?: any } = {accNum: "", pass: ""};

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public storage: StorageService,
              public utils: UtilsService) {


  }

  login() {
    let that = this;
    let params = {
      "loginName": that.account.accNum,
      "password": that.utils.Md5(that.account.pass),
      "sysSource": '1',
      "cid": ''
    };
    that.http.post('login', params).then(token => {
      localStorage.setItem('token', JSON.stringify(token));
      that.storage.setItem(APPSTATUS.SUCCESS_TOKEN, token).then(data => {
        //获取用户信息
        that.http.post('getPerson', {}).then(data => {
          //存储用户的uuid
          localStorage.setItem('userUuid', data['userUuid']);
          that.navCtrl.setRoot(TabsPage);
        }, err => {
          console.log("请求错误", err);
        });
      });
    }, err => {
      console.log(err);
    });
  }
}
