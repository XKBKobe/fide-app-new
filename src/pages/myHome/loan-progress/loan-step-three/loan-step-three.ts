import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-loan-step-three',
  templateUrl: 'loan-step-three.html'
})
export class LoanStepThreePage {

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    console.log('LoanStepThreePage');
  }
}
