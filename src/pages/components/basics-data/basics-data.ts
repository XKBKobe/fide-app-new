import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CommDatas} from "../../../providers/BaseConfig";


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
  commonBank: any = CommDatas.commonBank;
  //住宅情况
  houseProperty: any = CommDatas.houseProperty;
  //住宅性质
  houseType: any = CommDatas.houseType;
  //婚姻状态
  marriage: any = CommDatas.marriage;
  //配偶文化程度
  education: any = CommDatas.education;
  //配偶单位性质
  orgType: any = CommDatas.orgType;
  //有无子女
  children: any = CommDatas.children;
  //是否购车
  carProperty: any = CommDatas.carProperty;
  //月收入
  monthIncome: any = CommDatas.monthIncome;
  //行业
  industry: any = CommDatas.industry;


  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    console.log(this.step3Set);
    console.log(this.personData);
  }
}
