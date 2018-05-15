import {Component, Input} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {DataSaveService} from "../../../providers/DataSaveService";
import {HttpApiService} from "../../../providers/HttpApiService";
import {MessageService} from "../../../providers/MessageService";


@Component({
  selector: 'page-nearby-bank',
  templateUrl: 'nearby-bank.html'
})
export class NearbyBankPage {
  //附近营业点
  @Input('nearbyData') nearbyData: any;
  //product
  @Input('product') product: any;

  constructor(public navCtrl: NavController,
              public dataSave: DataSaveService,
              public alertCtrl: AlertController,
              public http: HttpApiService,
              public message: MessageService) {

  }

  ngOnInit() {
    console.log(this.nearbyData);
  }

  showConfirm(item) {
    let that = this;
    let type = that.product['name'];
    let params = {
      orgUuid: item.orgUuid,
      productUuid: that.product.productUuid,
      merchantUuid:that.dataSave.getMerchant(),
      purpose:that.dataSave.getPurpose()
    };
    console.log(params);
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: `您将向${item.orgName}提交<br>"${type}"申请`,
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            that.http.post('applyLoan', params).then(res => {
              that.message.showToastTop('贷款申请成功，可前往"我的申请"查看申请记录');
              that.navCtrl.popToRoot();
              that.navCtrl.parent.select(1);
            });
            console.log('agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}
