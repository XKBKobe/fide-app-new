import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpApiService} from "../../../providers/HttpApiService";

@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html'
})
export class ProductDetailPage {
  productUuid: any;
  data: any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpApiService) {

    this.productUuid = navParams.get('productUuid')
  }

  ionViewDidLoad() {
    this.http.post('queryProductInfo', {productUuid: this.productUuid}).then(res => {
      this.data = res;
    })
  }
}
