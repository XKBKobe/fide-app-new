import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {HttpApiService} from "../../../providers/HttpApiService";
import {MessageService} from "../../../providers/MessageService";
import {UtilsService} from "../../../providers/UtilsService";
import {LoginPage} from "../../welcome/login";

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage {
  password: { oldPwd?: any, newPwd?: any, authPwd?: any } = {oldPwd: "", newPwd: "", authPwd: ""};

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public message: MessageService,
              public modalCtrl: ModalController,
              public utils: UtilsService) {

  }

  ionViewDidLoad() {

  }

  submit() {
    let that = this;
    let reg = /[\u4e00-\u9fa5]+/;
    if (!that.password.oldPwd) {
      that.message.presentAlert('旧密码不能为空');

    } else if (that.password.oldPwd.indexOf(" ") != -1) {

      that.message.presentAlert('旧密码中不能包含空格');

    } else if (reg.test(that.password.oldPwd)) {

      that.message.presentAlert('旧密码中不能输入中文');

    } else if (!that.password.newPwd) {

      that.message.presentAlert('新密码不能为空');

    } else if (that.password.newPwd.indexOf(" ") != -1) {

      that.message.presentAlert('新密码中不能包含空格');

    } else if (reg.test(that.password.newPwd)) {

      that.message.presentAlert('新密码中不能输入中文');

    } else if (that.password.newPwd.length < 6 || that.password.newPwd.length > 12) {

      that.message.presentAlert('新密码应该为6-12位字符');

    } else if (!that.password.authPwd) {

      that.message.presentAlert('确认密码不能为空');

    } else if (that.password.authPwd.indexOf(" ") != -1) {

      that.message.presentAlert('确认密码中不能包含空格');

    } else if (that.password.authPwd != that.password.authPwd) {

      that.message.presentAlert('新密码与确认密码不一致');
    } else {
      let params = {
        "oldpwd": that.utils.Md5(that.password.oldPwd),
        "newpwd": that.utils.Md5(that.password.newPwd),
      };
      that.http.post('updatepwd', params).then(res => {
        that.message.showToastTop("密码修改成功，请重新登录");
        var time = setTimeout(function () {
          localStorage.clear();
          that.modalCtrl.create(LoginPage).present();
          clearTimeout(time);
        }, 1500);
      }, err => {
        if (err && err['respCode'] == 101604) {
          localStorage.clear();
          return that.modalCtrl.create(LoginPage).present();
        }
      })
    }
  }
}
