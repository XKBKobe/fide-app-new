import {Component, ViewChild} from '@angular/core';
import {ModalController, NavController, Slides} from 'ionic-angular';
import {ProductDetailPage} from "./product-detail/product-detail";
import {HttpApiService} from "../../providers/HttpApiService";
import {CONSTANTS} from "../../providers/BaseConfig";
import {LoginPage} from "../welcome/login";

@Component({
  selector: 'page-my-home',
  templateUrl: 'my-home.html'
})
export class MyHomePage {
  @ViewChild(Slides) slides: Slides;
  data: any = [];

  params: any = {"areaCode": CONSTANTS.defaultCode};

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public modalCtrl: ModalController) {

  }

  ionViewDidEnter() {
    this.slides.startAutoplay();
    this.getProductList();
  }

  ionViewDidLeave() {
    this.slides.stopAutoplay();
  }

  getProductList(refresher?){
    this.http.post('queryProductList', this.params).then(res => {
      console.log(res);
      this.data = res;
      refresher && refresher.complete();
    }, err => {
      if (err && err['respCode'] == 101604) {
        localStorage.clear();
        this.modalCtrl.create(LoginPage).present();
        return false;
      }
      refresher && refresher.complete();
    })
  }

  refresh(refresher) {
    this.getProductList(refresher);
  }

  productDetail(productUuid) {
    this.navCtrl.push(ProductDetailPage,{
      productUuid: productUuid
    });
  }

}
