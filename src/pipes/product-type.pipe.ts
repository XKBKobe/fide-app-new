/**
 * Created by asto on 2017/6/2.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'productType',
  pure: false
})
export class ProductTypePipe implements PipeTransform {
  transform(type: any) {
    if (type) {
      let typeText = '信用';
      if (type == '1') {
        typeText = '抵押'
      } else if (type == '2') {
        typeText = '信用'
      } else {
        typeText = '信用卡'
      }
      return typeText;
    }
  }
}
