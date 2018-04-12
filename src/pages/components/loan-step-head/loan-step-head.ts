import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-loan-step-head',
  templateUrl: 'loan-step-head.html'
})
export class LoanStepHeadPage {
  page:number = 1;
  //点击跳转到指定界面
  @Output() skipToPage: EventEmitter<string> = new EventEmitter<string>();

  constructor(public navCtrl: NavController) {

  }

  //跳转到页面
  goPage(page) {
    this.page = page;
    this.skipToPage.emit(page)
  }
}
