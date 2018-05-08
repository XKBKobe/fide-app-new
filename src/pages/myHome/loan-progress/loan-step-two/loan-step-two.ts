import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpApiService} from "../../../../providers/HttpApiService";

@Component({
  selector: 'page-loan-step-two',
  templateUrl: 'loan-step-two.html'
})
export class LoanStepTwoPage {
  //贷款步骤
  @Input('step2Set') step2Set: any;

  //点击跳转到指定界面
  @Output() nextToPage: EventEmitter<number> = new EventEmitter<number>();

  personData: any;

  constructor(public navCtrl: NavController,
              public http: HttpApiService) {

  }

  ngOnInit() {
    console.log(this.step2Set);
    //查询个人资料
    this.http.post('queryPersonalMaterial', {}, false).then(data => {
      this.personData = data;
    });
    console.log('LoanStepTwoPage');
  }

  next() {
    this.nextToPage.emit(3);
  }
}
