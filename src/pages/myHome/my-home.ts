import {Component, ViewChild} from '@angular/core';
import {Events, ModalController, NavController, Slides} from 'ionic-angular';
import {ProductDetailPage} from "./product-detail/product-detail";
import {HttpApiService} from "../../providers/HttpApiService";
import {CITY_DATA, CONSTANTS} from "../../providers/BaseConfig";
import {LoginPage} from "../welcome/login";
import {DataSaveService} from "../../providers/DataSaveService";
import {LoanProgress} from "./loan-progress/loan-progress";
import {SelectCityPage} from "./select-city/select-city";
import {CordovaService} from "../../providers/CordovaService";

@Component({
  selector: 'page-my-home',
  templateUrl: 'my-home.html'
})
export class MyHomePage {
  @ViewChild(Slides) slides: Slides;
  data: any = [];
  locateCity: any = CONSTANTS.defaultCity;
  params: any = {"areaCode": CONSTANTS.defaultCode};

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public modalCtrl: ModalController,
              public dataSave: DataSaveService,
              public events: Events,
              public cordovaService: CordovaService) {

  }

  ionViewDidEnter() {
    this.slides.startAutoplay();
    this.getProductList();

    this.events.subscribe("recentCity", (data) => {
      if (data) {
        this.params['areaCode'] = data.code;
        this.events.unsubscribe('recentCity');
      }
    });
  }

  ionViewDidLoad() {
    let that = this;
    that.cordovaService.getLocation().then(data => {
      if (!!data) {
        let province = data['province'];
        let city = data['city'];
        let proIndx = _.findIndex(CITY_DATA, {name: province});
        let cityIndx = _.findIndex(CITY_DATA[proIndx]['children'], {name: city});
        that.params['areaCode'] = CITY_DATA[proIndx]['children'][cityIndx].code;
      }
    }, err => {
      console.log('定位失败  ', err);
    })
  }

  ionViewDidLeave() {
    this.slides.stopAutoplay();
  }

  getProductList(refresher?) {
    this.http.post('queryProductList', this.params).then(res => {
      console.log(res);
      this.data = res;
      refresher && refresher.complete();
    }, err => {
      if (err && err['respCode'] == 101604) {
        return this.modalCtrl.create(LoginPage).present();
      }
      refresher && refresher.complete();
    })
  }

  refresh(refresher) {
    this.getProductList(refresher);
  }

  productDetail(item) {
    let that = this;
    if (!item.hasApplying) {
      that.navCtrl.push(ProductDetailPage, {
        productUuid: item.productUuid
      });
    } else {
      that.queryProduct(item.productUuid);
    }
  }

  queryProduct(productUuid) {
    console.log('queryProduct')
    let that = this;
    //获取产品信息
    that.http.post('queryProductInfo', {productUuid: productUuid}).then(res => {
      //设置还款方式
      that.availablePeriods(res['availablePeriods']);
      //贷款流程
      that.navCtrl.push(LoanProgress, {
        product: res
      });
    }, err => {
      if (err && err['respCode'] == 101604) {
        localStorage.clear();
        this.modalCtrl.create(LoginPage).present();
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

  openCity() {
    console.log('openCity')
    this.navCtrl.push(SelectCityPage, {
      locateCity: this.locateCity
    });
  }
}
