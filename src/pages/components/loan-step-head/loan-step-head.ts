import {Component, EventEmitter, Output} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-loan-step-head',
  templateUrl: 'loan-step-head.html'
})
export class LoanStepHeadPage {

  //点击跳转到指定界面
  @Output() skipToPage: EventEmitter<string> = new EventEmitter<string>();

  constructor(public navCtrl: NavController) {

  }

  goPage(page){
    this.skipToPage.emit(page)
  }
}
