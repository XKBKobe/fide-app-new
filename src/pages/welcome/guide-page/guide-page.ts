import {Component} from '@angular/core';
import {NavController, ViewController, NavParams, App} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {StorageService} from "../../../providers/StorageService";
import {LoginPage} from "../login";

@Component({
  selector: 'guide-page',
  templateUrl: 'guide-page.html',
})
export class GuidePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public app: App,
              public storage: StorageService) {
  }

  goToHome() {
    //第一次进入app
    this.storage.setItemCb('firstIn', true).then(res => {
      this.app.getRootNav().setRoot(LoginPage);
    })
  }

  ionViewDidLoad() {

  }
}
