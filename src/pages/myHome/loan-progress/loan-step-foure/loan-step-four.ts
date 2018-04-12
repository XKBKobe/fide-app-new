import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-loan-step-four',
  templateUrl: 'loan-step-four.html'
})
export class LoanStepFourPage {

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    console.log('LoanStepFourPage');
  }

}
