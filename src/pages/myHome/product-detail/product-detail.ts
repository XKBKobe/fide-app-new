import {Component} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {HttpApiService} from "../../../providers/HttpApiService";
import {LoginPage} from "../../welcome/login";
import {LoanProgress} from "../loan-progress/loan-progress";


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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpApiService,
              public modalCtrl: ModalController) {

    this.productUuid = navParams.get('productUuid')
  }

  ionViewDidLoad() {
    //获取产品信息
    this.http.post('queryProductInfo', {productUuid: this.productUuid}).then(res => {
      this.data = res;
      this.queryOrgList(res['availableOrg']);
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
        console.log(filterOrgList);
        that.orgList = filterOrgList;
      } else {
        that.orgList = res;
      }

      if (that.orgList.length > 3) {
        that.showMoreHide = true;
        that.showMoreOrg = true;
        // that.showHideOrg = false;
      }
    })
  }

  showMore() {
    this.showMoreOrg = !this.showMoreOrg;
  }

  showHide() {
    this.showMoreOrg = !this.showMoreOrg;
  }

  //立即申请贷款
  apply(){
    this.navCtrl.push(LoanProgress)
  }
}
