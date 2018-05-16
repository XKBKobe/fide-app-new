import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {MessageService} from "../../../providers/MessageService";

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
              public events: Events,
              public message: MessageService) {

  }

  ngOnInit() {
    this.events.subscribe("nextToPage", (data) => {
      this.page = data;
      console.log('发布订阅  ' + data)
    });
  }


  //跳转到头部和页面
  goPage(page) {
    let that = this;
    if(page == 5){
      //核身资料
      if (!that.loanStep.step1) {
        return that.message.presentAlert('请先完成核身');
      }
      //个人资料
      if (!that.loanStep.step2) {
        return that.message.presentAlert('请完善个人资料信息');
      }
      //基础资料
      if (!that.loanStep.step3) {
        return that.message.presentAlert('请完善基础资料信息');
      }
      //信贷信息
      if (!that.loanStep.step4) {
        return that.message.presentAlert('请完善信贷资料信息');
      }
    }
    //头部
    this.page = page;
    //页面
    this.skipToPage.emit(page)
  }
}
