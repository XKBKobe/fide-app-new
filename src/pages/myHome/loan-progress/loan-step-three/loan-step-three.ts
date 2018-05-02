import {Component, EventEmitter, Output} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-loan-step-three',
  templateUrl: 'loan-step-three.html'
})
export class LoanStepThreePage {
  //点击跳转到指定界面
  @Output() nextToPage: EventEmitter<number> = new EventEmitter<number>();

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    console.log('LoanStepThreePage');
  }

  next(){
    this.nextToPage.emit(4);
  }
}
