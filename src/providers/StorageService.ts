import {Injectable} from "@angular/core";
import {Events} from 'ionic-angular';
import {Storage} from '@ionic/storage';

@Injectable()
export class StorageService {
  constructor(public events: Events, public storage: Storage) {
    storage.ready().then(() => {
    });
  }

  //设置storage
  setItem(name: string, value: any) {
    return new Promise((resolve, reject) => {
      this.storage.set(name, value).then(data => {
        console.log('name  ' + name + '  value  ' + value + '  data ' + data);
        resolve(data);
      }, err => {
        reject(err);
      })
    });
  }

  //获取storage
  getItem(name: string) {
    return new Promise((resolve, reject) => {
      this.storage.get(name).then((val) => {
        resolve(val);
      }, err => {
        reject(err);
      });
    });
  }

  //删除storage
  removeItem(name: string) {
    return new Promise((resolve, reject) => {
      this.storage.remove(name).then(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  //清除storage
  clearItem(cbFun?) {
    this.storage.clear().then(function () {
      cbFun && cbFun(true);
    });
  }
}
