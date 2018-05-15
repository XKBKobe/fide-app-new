import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpApiService} from "../../../../providers/HttpApiService";

@Component({
  selector: 'page-loan-step-five',
  templateUrl: 'loan-step-five.html'
})
export class LoanStepFivePage {
  //product
  @Input('product') product: any;
  //附近营业点
  nearbyData: any;

  constructor(public navCtrl: NavController,
              public http: HttpApiService) {

  }

  ngOnInit() {
    //todo  定位拿到经纬度
    this.http.post('queryOrgByProduct', {productUuid: this.product.productUuid}).then(res => {
      console.log(res);
      this.nearbyData = res;
    })
  }
}
