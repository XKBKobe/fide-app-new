import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CITY_DATA, CommDatas} from "../../../providers/BaseConfig";
import {DataSaveService} from "../../../providers/DataSaveService";

@Component({
  selector: 'page-basics-data',
  templateUrl: 'basics-data.html'
})
export class BasicsDataPage {
  //贷款步骤
  @Input('step3Set') step3Set: any;
  //基础资料显示
  @Input('personData') personData: any;
  //product
  @Input('product') product: any = {};
  //城市数据
  cityData: any = CITY_DATA;
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
  //请选择户籍
  household: string = '请选择户籍';
  //住宅地址
  liveAddress: string = '请选择住宅地址';
  //单位地址
  companyAddress: string = '请选择单位地址';
  //经营地址
  manageAddress: string = '请选择经营地址';
  //受托支付
  merchantDisabled: boolean = false;
  //配偶学历
  educationOptions: any = {};
  //最高学历
  heightEducationOptions: any = {};
  //配偶单位性质
  orgTypeOptions: any = {};
  //房产
  houseShow: boolean = false;
  //是否购车
  carShow: boolean = false;
  //婚姻状况
  marriageShow: boolean = false;

  constructor(public navCtrl: NavController,
              public dataSave: DataSaveService) {

  }

  ngOnInit() {
    let that = this;
    //受托支付上次的贷款 todo
    if (!!that.product['preLoanMerchantUuid']) {
      that.product['merchantUuid'] = that.product['preLoanMerchantUuid'];
      that.merchantDisabled = true;
      that.dataSave.setMerchant(that.product['preLoanMerchantUuid']);
    } else if (!!that.step3Set.step5 && that.product['merchantUuid']) {
      that.merchantDisabled = true;
      that.dataSave.setMerchant(that.product['merchantUuid']);
    } else {
      that.merchantDisabled = false;
    }

    let data = that.personData;
    let provinceCode;
    let index;
    let cityIndex;
    // if (!!data["householdZip"]) {
    //   provinceCode = data["householdZip"].substr(0, 2) + '0000';
    //   index = _.findIndex(this.cityData, {value: provinceCode});
    //   cityIndex = _.findIndex(this.cityData[index].children, {value: data["householdZip"]});
    //   this.household = this.cityData[index].name + ' - ' + this.cityData[index].children[cityIndex].name;
    // }
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

    //有没有房产
    if (!!data["houseProperty"] && data["houseProperty"] != 1) {
      that.houseShow = true;
    } else {
      that.houseShow = false;
    }

    //是否购车
    if (!!data["carProperty"] && data["carProperty"] != 1) {
      that.carShow = true;
    } else {
      that.carShow = false;
    }

    //婚姻状况
    if (!!data["marriage"] && data["marriage"] == 3) {
      that.marriageShow = true;
    } else {
      that.marriageShow = false;
    }

    that.educationOptions = {
      title: '配偶文化程度'
    };

    that.orgTypeOptions = {
      title: '配偶单位性质'
    };

    that.heightEducationOptions = {
      title: '最高学历'
    };

    this.personData = data;
    console.log(this.product);
  }

  //请选择户籍
  householdChange(event) {
    console.log(event);
  }

  //请选择户籍
  liveAddressChange(event) {
    console.log(event);
  }

  //请选择单位地址
  companyAddressChange(event) {
    console.log(event);
  }

  //请选择经营地址
  manageAddressChange(event) {
    console.log(event);
  }

  updateSelect() {
    if (!!this.personData.houseProperty && this.personData.houseProperty != 1) {
      this.houseShow = true;
    } else {
      this.houseShow = false;
    }

    if (!!this.personData.carProperty && this.personData.carProperty != 1) {
      this.carShow = true;
    } else {
      this.carShow = false;
    }

    if (!!this.personData.marriage && this.personData.marriage == 3) {
      this.marriageShow = true;
    } else {
      this.marriageShow = false;
    }
  }

  //商铺
  merChantChange(event) {
    this.dataSave.setMerchant(event);
  }
}
