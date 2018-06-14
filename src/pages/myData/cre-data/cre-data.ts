import {Component} from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';
import {HttpApiService} from "../../../providers/HttpApiService";
import {CommonService} from "../../../providers/commonService";

@Component({
  selector: 'page-cre-data',
  templateUrl: 'cre-data.html'
})
export class CreDataPage {
  //信息配置
  personSetting: any;
  //信贷资料
  step4Set: any;

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public navParams: NavParams,
              public comm: CommonService,
              public events: Events) {
    this.personSetting = navParams.get('personSetting')
  }

  ionViewDidLoad() {
    let that = this;
    let creSet = that.personSetting.availableDataSource;
    that.http.post('isDataFill', {}).then(res => {
      console.log('isDataFill ', res);
      //查询信贷资料的数目
      that.comm.checkMaterial(creSet, 'step4', data => {
        for (let i in data) {
          if (res[i]) {
            data[i].num = res[i];
          }
        }
        that.step4Set = data;
      });
    });
    //取消发布订阅
    that.events.unsubscribe('notifyResult')
  }

}
