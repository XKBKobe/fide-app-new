import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CommDatas} from "../../../providers/HttpSettings";

@Component({
  selector: 'page-basics-data',
  templateUrl: 'basics-data.html'
})
export class BasicsDataPage {
  //贷款步骤
  @Input('step3Set') step3Set: any;
  //基础资料显示
  @Input('personData') personData: any;
  //家庭联系人
  contactData: any = CommDatas.contactData;
  //第二联系人
  secondContactData: any = CommDatas.secondContactData;
  //常用开户银行
  commonBank:any = CommDatas.commonBank;
  //住宅情况
  houseProperty:any = CommDatas.houseProperty;


  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    console.log(this.step3Set);
    console.log(this.personData);
  }

}
