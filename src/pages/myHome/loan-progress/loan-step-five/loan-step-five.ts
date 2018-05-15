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

  constructor(public navCtrl: NavController,
              public http: HttpApiService) {

  }

  ngOnInit() {
    this.http.post('queryOrgByProduct', {productUuid: this.product.productUuid}).then(res => {
      console.log(res);
    })
  }
}
