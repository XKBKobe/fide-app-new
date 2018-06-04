import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AlipayPage} from "../../myData/cre-data/alipay/alipay";
import {TobaccoPage} from "../../myData/cre-data/tobacco/tobacco";
import {FundPage} from "../../myData/cre-data/fund/fund";
import {BankPage} from "../../myData/cre-data/bank/bank";
import {PosPage} from "../../myData/cre-data/pos/pos";

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
  //公积金
  FundPage = FundPage;
  //银行卡
  BankPage = BankPage;
  //pos
  PosPage = PosPage;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {

    console.log(this.step4Set);
  }

}
