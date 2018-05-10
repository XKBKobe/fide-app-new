import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpApiService} from "../../../../providers/HttpApiService";

@Component({
  selector: 'page-loan-step-three',
  templateUrl: 'loan-step-three.html'
})
export class LoanStepThreePage {
  //贷款步骤
  @Input('step3Set') step3Set: any;
  //点击跳转到指定界面
  @Output() nextToPage: EventEmitter<number> = new EventEmitter<number>();
  //基础资料
  personData: any;

  constructor(public navCtrl: NavController,
              public http: HttpApiService) {

  }

  ngOnInit() {
    console.log('LoanStepThreePage');
    //查询个人资料
    this.http.post('queryPersonalMaterial', {}, false).then(data => {
      //家庭联系人
      if (!data["primaryContact"]) {
        data["primaryContact"] = {};
      }
      //第二联系人
      if (!data["secondaryContact"]) {
        data["secondaryContact"] = {};
      }
      //配偶
      if (!data["spouse"]) {
        data["spouse"] = {};
      }

      this.personData = data;

      console.log(this.personData);
    });
  }

  next(){
    this.nextToPage.emit(4);
  }
}
