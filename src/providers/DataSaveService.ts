import {Injectable} from '@angular/core';

@Injectable()
export class DataSaveService {

  //还款方式
  avaPeriods: any;

  //推荐码
  cmCode: any;

  constructor() {
  }

  setAvaPeriods(data) {
    this.avaPeriods = data;
  }

  getAvaPeriods() {
    return this.avaPeriods;
  }

  setCmCode(data) {
    this.cmCode = data;
  }

  getCmCode() {
    return this.cmCode;
  }

}
