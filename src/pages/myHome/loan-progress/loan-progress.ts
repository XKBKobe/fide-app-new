import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-loan-progress',
  templateUrl: 'loan-progress.html'
})
export class LoanProgress {
  page: number = 1;

  constructor(public navCtrl: NavController) {

  }

  //头部点击
  skipToPage(page) {
    this.page = page;
    console.log('定义头部 ' + page);
  }

  // //下一步点击
  // nextToPage(page) {
  //   //页面的变化
  //   this.page = page;
  //   console.log('下一步 ' + page);
  //   //头部的变化
  // }
}
