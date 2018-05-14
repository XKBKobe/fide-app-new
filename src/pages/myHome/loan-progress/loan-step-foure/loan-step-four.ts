import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpApiService} from "../../../../providers/HttpApiService";
import {MessageService} from "../../../../providers/MessageService";

@Component({
  selector: 'page-loan-step-four',
  templateUrl: 'loan-step-four.html'
})
export class LoanStepFourPage {
  //贷款步骤
  @Input('step4Set') step4Set: any;
  //点击跳转到指定界面
  @Output() nextToPage: EventEmitter<number> = new EventEmitter<number>();
  //step反馈
  @Output() outStep: EventEmitter<any> = new EventEmitter<any>();
  //信贷资料
  creditData: any;

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public message: MessageService) {

  }

  ngOnInit() {
    this.http.post('isDataFill', {}).then(res => {
      this.creditData = res;
    })
  }

  next() {
    let that = this;
    if (!!that.step4Set) {
      for (let i in that.step4Set) {
        let credit = that.step4Set[i];
        if (!!credit.isRequire) {
          if (that.creditData[i] > 0) {
            continue;
          } else {
            return that.message.presentAlert(credit.requireText);
          }
        }
      }
    }
    that.outStep.emit({step: 'step4', status: true});
    that.nextToPage.emit(5);
  }
}
