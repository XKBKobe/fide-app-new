import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../../welcome/login";
import {HttpApiService} from "../../../../providers/HttpApiService";
import {MessageService} from "../../../../providers/MessageService";


@Component({
  selector: 'page-oto',
  templateUrl: 'oto.html'
})
export class OtoPage {
  data: any = [];
  isOtoList: boolean = false;


  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public message: MessageService,
              public modalCtrl: ModalController) {


  }

  ionViewDidLoad() {
    console.log('1111');
    this.http.post("queryAccountByType", {acctType: 'OTO'}).then(result => {
      this.data = result;
      console.log(result);
    })
  }

  addOto() {
    this.isOtoList = true;
  }
}
