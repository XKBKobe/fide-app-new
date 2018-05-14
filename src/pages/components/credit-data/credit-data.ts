import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CREDIT_DATA} from "../../../providers/BaseConfig";

@Component({
  selector: 'page-credit-data',
  templateUrl: 'credit-data.html'
})
export class CreditDataPage {
  //贷款步骤
  @Input('step4Set') step4Set: any;

  creditData:any;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit(){
    this.creditData = CREDIT_DATA;
    console.log(this.step4Set);
  }

}
