import {Component, EventEmitter, Output} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-loan-step-four',
  templateUrl: 'loan-step-four.html'
})
export class LoanStepFourPage {
  //点击跳转到指定界面
  @Output() nextToPage: EventEmitter<number> = new EventEmitter<number>();

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    console.log('LoanStepFourPage');
  }

  next(){
    this.nextToPage.emit(5);
  }
}
