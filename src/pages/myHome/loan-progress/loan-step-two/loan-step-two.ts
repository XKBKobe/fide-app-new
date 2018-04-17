import {Component, EventEmitter, Output} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-loan-step-two',
  templateUrl: 'loan-step-two.html'
})
export class LoanStepTwoPage {

  //点击跳转到指定界面
  @Output() nextToPage: EventEmitter<number> = new EventEmitter<number>();

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    console.log('LoanStepTwoPage');
  }

  next(){
    this.nextToPage.emit(3);
  }
}
