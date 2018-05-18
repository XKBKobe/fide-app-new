import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {LoginPage} from "../welcome/login";
import {MessageService} from "../../providers/MessageService";
import {StorageService} from "../../providers/StorageService";

@Component({
  selector: 'page-my-center',
  templateUrl: 'my-center.html'
})
export class MyCenterPage {

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public message:MessageService,
              public storage:StorageService) {

  }

  loginOut(){
    let that = this;
    that.message.presentConfirm("提示", "退出当前账号", () => {
      localStorage.clear();
      that.storage.clearStorage(data =>{
        that.modalCtrl.create(LoginPage).present();
      })
    });
  }
}
