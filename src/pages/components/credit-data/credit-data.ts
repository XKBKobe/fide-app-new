import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AlipayPage} from "../../myData/cre-data/alipay/alipay";
import {TobaccoPage} from "../../myData/cre-data/tobacco/tobacco";

@Component({
  selector: 'page-credit-data',
  templateUrl: 'credit-data.html'
})
export class CreditDataPage {
  //贷款步骤
  @Input('step4Set') step4Set: any;

  creditData: any;
  //支付宝
  AlipayPage = AlipayPage;
  //烟草
  TobaccoPage = TobaccoPage;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    console.log(this.step4Set);
  }

}
