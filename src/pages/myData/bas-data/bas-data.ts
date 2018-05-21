import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpApiService} from "../../../providers/HttpApiService";
import {CommonService} from "../../../providers/commonService";

@Component({
  selector: 'page-bas-data',
  templateUrl: 'bas-data.html'
})
export class BasDataPage {
  //个人信息
  personData: any;
  //信息配置
  personSetting: any;
  //个人资料显示
  step3Set: any;

  constructor(public navCtrl: NavController,
              public http: HttpApiService,
              public navParams: NavParams,
              public comm: CommonService) {
    this.personSetting = navParams.get('personSetting')
  }
  ngOnInit() {
    console.log('ngOnInit');
  }

  ionViewDidEnter() {

  }

  ionViewDidLoad() {
    let that = this;
    let basSet = that.personSetting.basicMat;
    //查询个人资料
    that.http.post('queryPersonalMaterial', {}, false).then(data => {
      that.personData = data;
      that.comm.checkMaterial(basSet, 'step3', data => {
        that.step3Set = data;
      });
    });
  }
}
