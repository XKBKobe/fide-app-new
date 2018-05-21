import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpApiService} from "../../../providers/HttpApiService";
import {CommonService} from "../../../providers/commonService";

@Component({
  selector: 'page-per-data',
  templateUrl: 'per-data.html'
})
export class PerDataPage {
  //个人信息
  personData: any;
  //信息配置
  personSetting:any;
  //个人资料显示
  step2Set: any;

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public navParams: NavParams,
              public comm: CommonService) {
    this.personSetting = navParams.get('personSetting')
  }

  ionViewDidLoad() {
    let that = this;
    let perSet = that.personSetting.privateMat;
    //查询个人资料
    that.http.post('queryPersonalMaterial', {}, false).then(data => {
      that.personData = data;
      that.comm.checkMaterial(perSet, 'step2', data => {
        that.step2Set = data;
      });
    });
  }
}
