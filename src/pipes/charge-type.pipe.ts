/**
 * Created by asto on 2017/5/16.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'chargeType'
})
export class ChargeTypePipe implements PipeTransform {
  transform(type: string) {
    var typeString;
    if (type == '1') {
      typeString = '年利率';
    } else if (type == '2') {
      typeString = '月利率';
    } else if (type == '3') {
      typeString = '日利率';
    } else if (type == '4') {
      typeString = '月管理费';
    } else if (type == '5') {
      typeString = '月手续费';
    } else if (type == '6') {
      typeString = '年费率';
    } else if (type == '7') {
      typeString = '月费率';
    } else if (type == '8') {
      typeString = '日费率';
    }
    return typeString;
  }
}


