import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../../welcome/login";
import {HttpApiService} from "../../../../providers/HttpApiService";
import {MessageService} from "../../../../providers/MessageService";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'page-per-credit',
  templateUrl: 'per-credit.html'
})
export class PerCreditPage {
  loanUrl: any;

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public message: MessageService,
              public sanitizer: DomSanitizer,) {


  }

  ionViewDidLoad() {
    let params = {
      "thirdServer": "fideThirdOutServer",
      "pdfServer": "fideUserServer",
      "userUuid": localStorage.getItem('userUuid'),
      "time": new Date()

    };

    //贷款合同
    this.http.post('perCredit', params).then(res => {
      console.log(res);
      this.loanUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res['pdf']);
    }, err => {
    });
  }
}
