import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-loan-progress',
  templateUrl: 'loan-progress.html'
})
export class LoanProgress {
  page: number = 1;

  constructor(public navCtrl: NavController) {

  }

  skipToPage(page) {
    this.page = page;
    console.log(page);
  }
}
