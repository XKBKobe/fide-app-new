import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import Swiper from 'swiper';
import {HttpApiService} from "../../providers/HttpApiService";
import {PerDataPage} from "./per-data/per-data";
import {BasDataPage} from "./bas-data/bas-data";

@Component({
  selector: 'page-my-data',
  templateUrl: 'my-data.html'
})
export class MyDataPage {
  //信息配置
  personSetting:any;

  constructor(public navCtrl: NavController,
              public http: HttpApiService) {

  }

  ionViewDidEnter() {

  }

  ionViewDidLoad() {
    //配置swiper
    new Swiper('#swiper-container', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slideToClickedSlide: true,
      slidesPerView: 1.4,
      spaceBetween: 35,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });

    this.http.post('queryPersonalMaterialSetting', {}, false).then(res => {
     this.personSetting = res;
      console.log(res);
    });
  }

  //个人资料
  goPer(){
    this.navCtrl.push(PerDataPage,{
      personSetting:JSON.parse(this.personSetting)
    })
  }

  //个人资料
  goBas(){
    console.log('goBas');
    this.navCtrl.push(BasDataPage,{
      personSetting:JSON.parse(this.personSetting)
    })
  }
}
