import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'otoType',
  pure: false
})
export class OtoTypePipe implements PipeTransform {
  transform(type: any) {
    if (type) {
      let pos;
      type == 'dzdp' ? pos = '大众点评' : pos = '美团商家';
      return pos;
    }
  }
}
