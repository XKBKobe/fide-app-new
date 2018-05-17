import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import Swiper from 'swiper';

@Component({
  selector: 'page-my-data',
  templateUrl: 'my-data.html'
})
export class MyDataPage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter() {

  }

  ionViewDidLoad() {
    //配置swiper
    new Swiper('.my-data-swiper-container', {
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
  }
}
