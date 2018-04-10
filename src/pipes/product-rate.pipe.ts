/**
 * Created by asto on 2017/6/2.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'productRate',
  pure: false
})
export class ProductRatePipe implements PipeTransform {
  transform(item: any) {
    if (item) {
      if (item['rate'] == '3' || item['rate'] == '8') {
        if (item['rateUnit'] == '%') {
          var data = 10000 * 0.01 * item['downRate'];
          if (item['downRate'] == item['upperRate']) {
            if(Math.round(data) === data) { //整数
              item['rateText'] = '万元每日利息' + data + '元';
            }else{
              item['rateText'] = '万元每日利息' + data.toFixed(2) + '元';
            }
          } else {
            if(Math.round(data) === data) { //整数
              item['rateText'] = '万元每日利息' + 10000 * 0.01 * item['downRate'] + '~' + 10000 * 0.01 * item['upperRate'] + '元';
            }else{
              item['rateText'] = '万元每日利息' + (10000 * 0.01 * item['downRate']).toFixed(2) + '~' + (10000 * 0.01 * item['upperRate']).toFixed(2) + '元';
            }
          }
        } else {
          var data = 10000 * 0.001 * item['downRate'];
          if (item['downRate'] == item['upperRate']) {
            if(Math.round(data) === data){ //整数
              item['rateText'] = '万元每日利息' + data + '元';
            }else{
              item['rateText'] = '万元每日利息' + data.toFixed(2) + '元';
            }
          } else {
            if(Math.round(data) === data){ //整数
              item['rateText'] = '万元每日利息' + 10000 * 0.001 * item['downRate'] + '~' + 10000 * 0.001 * item['upperRate'] + '元';
            }else{
              item['rateText'] = '万元每日利息' + (10000 * 0.001 * item['downRate']).toFixed(2) + '~' + (10000 * 0.001 * item['upperRate']).toFixed(2) + '元';
            }
          }
        }
        item['rateTransfer'] = true;
      } else {
        if (item.downRate == item.upperRate) {
          item['rateText'] = item['downRate'] + item['rateUnit'];
        } else {
          item['rateText'] = item['downRate'] + item['rateUnit'] + '~' + item['upperRate'] + item['rateUnit'];
        }
      }
      return item['rateText'];
    }
  }
}
