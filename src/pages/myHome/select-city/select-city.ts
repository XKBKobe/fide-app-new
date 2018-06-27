import {Component} from '@angular/core';
import {Events, ModalController, NavController, NavParams} from "ionic-angular";
import {CITY_DATA} from "../../../providers/BaseConfig";
import {StorageService} from "../../../providers/StorageService";


@Component({
  selector: 'page-select-city',
  templateUrl: 'select-city.html'
})
export class SelectCityPage {
  //省份
  province: any = [];
  //城市
  city: any = [];
  //定位城市
  locateCity: any;
  //最近访问城市
  recentCity: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: StorageService,
              public events: Events) {
    this.locateCity = navParams.get('locateCity')
  }

  ngOnInit() {
    this.storage.getItem('recentCity').then(data => {
      if(!!data){
        let citys = [];
        for (let i in data) {
          citys.push(data[i]);
        }
        console.log(citys);
        this.recentCity = citys;
      }
    });

    //省份
    for (let pro of CITY_DATA) {
      this.province.push(pro);
      for (let ci of pro['children']) {
        if (ci.name == this.locateCity) {
          var proCode = pro.code;
          pro['selected'] = true;
          break;
        }
      }
    }
    let index = _.findIndex(CITY_DATA, {code: proCode});
    this.city = CITY_DATA[index]['children'];


    console.log(this.recentCity.length)
  }

  selectProvinces(data) {
    for (let pro of CITY_DATA) {
      pro['selected'] = false;
    }
    data.selected = true;
    this.city = data.children;
  }

  selectCity(data) {
    console.log(data);
    if (!!this.recentCity && !!this.recentCity.length) {
      let flag = true;
      let citys = this.recentCity;
      for (let city of citys) {
        if (city.name == data.name) {
          flag = false;
          break;
        }
      }

      if (flag) {
        if (citys >= 6) {
          citys.unshift(data);
          citys.pop();
        } else {
          citys.unshift(data);
        }
      } else {
        citys = _.without(citys, data);
        citys.unshift(data);
      }
      this.recentCity = citys;
      console.log(this.recentCity);
    } else {
      this.recentCity.push(data);
    }

    this.storage.setItem('recentCity', this.recentCity).then(res => {
      this.events.publish("recentCity", data);
      this.navCtrl.pop();
    })
  }
}
