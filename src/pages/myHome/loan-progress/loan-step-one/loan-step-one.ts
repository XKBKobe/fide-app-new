import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';


@Component({
  selector: 'page-loan-step-one',
  templateUrl: 'loan-step-one.html'
})
export class LoanStepOnePage {

  constructor(public navCtrl: NavController
            ) {

  }

  ngOnInit() {
    console.log('LoanStepOnePage');
  }

}
