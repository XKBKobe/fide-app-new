import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CommDatas} from "../../../providers/HttpSettings";
import {DataSaveService} from "../../../providers/DataSaveService";

@Component({
  selector: 'page-person-data',
  templateUrl: 'person-data.html'
})
export class PersonDataPage {
  //个人资料显示
  @Input('step2Set') step2Set: any;

  //个人资料显示
  @Input('personData') personData: any;

  //贷款用途
  purpose: any = CommDatas.purpose;

  //还款方式
  avaPeriods: any;

  //推荐码
  cmCode: boolean = true;

  constructor(public navCtrl: NavController,
              public dataSave: DataSaveService) {

  }

  ngOnInit() {
    this.avaPeriods = this.dataSave.getAvaPeriods();
    this.cmCode = this.dataSave.getCmCode();
  }
}
