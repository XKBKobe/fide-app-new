import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'posType',
  pure: false
})
export class PosTypePipe implements PipeTransform {
  transform(type: any) {
    if (type) {
      let pos;
      type == 'tl' ? pos = '通联' : pos = '银联';
      return pos;
    }
  }
}
