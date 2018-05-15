import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

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
    console.log(this.step4Set);
  }

}
