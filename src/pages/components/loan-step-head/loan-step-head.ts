import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Events, NavController} from 'ionic-angular';

@Component({
  selector: 'page-loan-step-head',
  templateUrl: 'loan-step-head.html'
})
export class LoanStepHeadPage {
  page: number = 1;
  //贷款步骤
  @Input('loanStep') loanStep: any;
  //点击跳转到指定界面
  @Output() skipToPage: EventEmitter<number> = new EventEmitter<number>();

  constructor(public navCtrl: NavController,
              public events: Events) {

  }

  ngOnInit() {
    this.events.subscribe("nextToPage", (data) => {
      this.page = data;
      console.log('发布订阅  ' + data)
    });
  }


  //跳转到头部和页面
  goPage(page) {
    //头部
    this.page = page;
    //页面
    this.skipToPage.emit(page)
  }
}
