import {Component} from '@angular/core';
import {Events, NavController} from 'ionic-angular';

@Component({
  selector: 'page-loan-progress',
  templateUrl: 'loan-progress.html'
})
export class LoanProgress {
  page: number = 1;

  constructor(public navCtrl: NavController,
              public events: Events) {

  }

  ionViewDidLeave() {
    //取消订阅事件
    this.events.unsubscribe('nextToPage');
  }

  //头部点击 output
  skipToPage(page) {
    this.page = page;
    console.log('定义头部 ' + page);
  }

  //下一步点击 output
  nextToPage(page) {
    this.page = page;
    console.log('下一步 ' + page);
    this.events.publish("nextToPage", page);
  }


}
