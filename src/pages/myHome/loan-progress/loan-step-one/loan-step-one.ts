import {Component, EventEmitter, Output} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpApiService} from "../../../../providers/HttpApiService";


@Component({
  selector: 'page-loan-step-one',
  templateUrl: 'loan-step-one.html'
})
export class LoanStepOnePage {
  //个人信息
  personData: any;
  //step反馈
  @Output() outStep: EventEmitter<any> = new EventEmitter<any>();

  //点击跳转到指定界面
  @Output() nextToPage: EventEmitter<number> = new EventEmitter<number>();

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
            ) {

  }

  ngOnInit() {
    //查询个人资料
    this.http.post('queryPersonalMaterial', {}, false).then(data => {
      this.personData = data;
    });
  }

  outStepOne(data){
    console.log('page-loan-step-one step1');
    this.outStep.emit(data)
  }

  nextToPageTwo(data){
    console.log('page-loan-step-one step2');
    this.nextToPage.emit(data)
  }
}
