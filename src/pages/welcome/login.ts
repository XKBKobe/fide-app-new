import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {HttpApiService} from "../../providers/HttpApiService";
import {md5For16} from "../../providers/UtilsService";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              public http :HttpApiService) {

  }

  login(){
    let params = {
      "loginName": 18055417483,
      "password": md5For16('000000'),
      "sysSource": '1',
      "cid": ''
    };
    this.http.post('login',params).then(data =>{
      this.navCtrl.setRoot(TabsPage);
    },err =>{
      console.log(err);
    });
  }
}
