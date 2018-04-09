import {Component, ViewChild} from '@angular/core';
import {NavController, Slides} from 'ionic-angular';
import {ProductDetailPage} from "./product-detail/product-detail";

@Component({
  selector: 'page-my-home',
  templateUrl: 'my-home.html'
})
export class MyHomePage {
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter() {
    this.slides.startAutoplay();
  }

  ionViewDidLeave() {
    this.slides.stopAutoplay();
  }

  goProduct(){
    this.navCtrl.push(ProductDetailPage);
  }
}
