import {Component} from '@angular/core';
import {Events, ModalController, NavController, NavParams} from "ionic-angular";
import {CITY_DATA} from "../../../providers/BaseConfig";


@Component({
  selector: 'page-select-city',
  templateUrl: 'select-city.html'
})
export class SelectCityPage {
  //省份
  province: any = [];
  //城市
  city: any = [];

  constructor(public navCtrl: NavController) {

  }

  ngOnInit(){
    //省份
    for (let pro of CITY_DATA) {
      this.province.push(pro);
    }

    //城市
    for (var i = 0; i < CITY_DATA.length; i++) {
      var citytem = [];
      for (var j = 0; j < CITY_DATA[i].children.length; j++) {
        citytem.push(CITY_DATA[i].children[j].name);
      }
    }

    console.log(citytem)
    console.log('ngOnInit')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad')
    //省份


  }
}
