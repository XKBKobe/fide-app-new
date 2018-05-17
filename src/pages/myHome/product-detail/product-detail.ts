import {Component} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {HttpApiService} from "../../../providers/HttpApiService";
import {LoginPage} from "../../welcome/login";
import {LoanProgress} from "../loan-progress/loan-progress";
import {DataSaveService} from "../../../providers/DataSaveService";


@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html'
})
export class ProductDetailPage {
  productUuid: any;
  data: any = {};
  orgTempList: any = [];
  orgList: any = [];
  showMoreHide: boolean = false;
  showMoreOrg: boolean = false; //更多图标
  showHideOrg: boolean = false; //收起图标
  applyDisabled: boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpApiService,
              public modalCtrl: ModalController,
              public dataSave: DataSaveService) {

    this.productUuid = navParams.get('productUuid')
  }

  ionViewDidLoad() {
    //获取产品信息
    this.http.post('queryProductInfo', {productUuid: this.productUuid}).then(res => {
      this.data = res;
      //查询贷款状态
      this.getLoanStatus();
      //查询支持机构
      this.queryOrgList(res['availableOrg']);
      //设置还款方式
      this.availablePeriods(res['availablePeriods']);
    }, err => {
      if (err && err['respCode'] == 101604) {
        localStorage.clear();
        this.modalCtrl.create(LoginPage).present();
        return false;
      }
    })
  }

  //查询附近银行机构
  queryOrgList(availableOrg) {
    let that = this;
    this.http.post('queryOrg', {productUuid: this.productUuid}).then(res => {
      that.orgTempList = res;
      //支持的机构
      if (!!availableOrg) {
        let filterOrgList = [];
        if (availableOrg.includes('|') || availableOrg) {
          let availableArray = availableOrg.split('|');
          for (let code of availableArray) {
            for (let list of that.orgTempList) {
              if (code == list['orgCode']) {
                filterOrgList.push(list);
              }
            }
          }
        }
        that.orgList = filterOrgList;
      } else {
        that.orgList = res;
      }

      if (that.orgList.length > 3) {
        that.showMoreHide = true;
        that.showMoreOrg = true;
      }
    })
  }

  getLoanStatus() {
    let that = this;
    //获取产品信息
    that.http.post('getPersonalLoanStatus', {}).then(res => {
      !!res['hasApplying'] ? that.applyDisabled = true : that.applyDisabled = false;
    }, err => {
      if (err && err['respCode'] == 101604) {
        localStorage.clear();
        that.modalCtrl.create(LoginPage).present();
        return false;
      }
    })
  }

  availablePeriods(data) {
    //还款方式
    if (!!data) {
      let repayWayData = [];
      //贷款的期数
      var loanType = data;
      var loanTypeArr = loanType.split(',');
      for (let item = 0; item < loanTypeArr.length; item++) {
        if (item == 0) {
          if (loanTypeArr[item] == '1') {
            var repayWayJson = {};
            repayWayJson['text'] = '随借随还';
            repayWayJson['value'] = loanTypeArr[item];
            repayWayData.push(repayWayJson);
          }
        } else {
          var repayWayJson = {};
          repayWayJson['text'] = '分' + loanTypeArr[item] + '期';
          repayWayJson['value'] = loanTypeArr[item];
          repayWayData.push(repayWayJson);
        }
      }
      //设置还款方式
      this.dataSave.setAvaPeriods(repayWayData);
    }
  }

  showMore() {
    this.showMoreOrg = !this.showMoreOrg;
  }

  showHide() {
    this.showMoreOrg = !this.showMoreOrg;
  }

  //立即申请贷款
  apply() {
    this.navCtrl.push(LoanProgress, {
      product: this.data
    })
  }
}
