import {Injectable} from '@angular/core';

@Injectable()
export class DataSaveService {

  //还款方式
  avaPeriods: any;
  //推荐码
  cmCode: any;
  //受托支付
  merchant: any;
  //贷款用途
  purpose:any;

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

  setMerchant(data) {
    this.merchant = data;
  }

  getMerchant() {
    return this.merchant;
  }

  setPurpose(data){
    this.purpose = data;
  }

  getPurpose() {
    return this.purpose;
  }

}
