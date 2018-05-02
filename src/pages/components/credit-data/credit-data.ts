import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CREDIT_DATA} from "../../../providers/BaseConfig";

@Component({
  selector: 'page-credit-data',
  templateUrl: 'credit-data.html'
})
export class CreditDataPage {

  creditData:any;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit(){
    this.creditData = CREDIT_DATA;
  }

}
