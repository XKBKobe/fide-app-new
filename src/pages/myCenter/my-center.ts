import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {LoginPage} from "../welcome/login";

@Component({
  selector: 'page-my-center',
  templateUrl: 'my-center.html'
})
export class MyCenterPage {

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController) {

  }

  loginOut(){
   this.modalCtrl.create(LoginPage).present();
  }
}
