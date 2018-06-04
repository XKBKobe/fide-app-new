import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'bankFormat',
  pure: false
})
export class BankFormatPipe implements PipeTransform {
  transform(num: any) {
    if (num) {
      let len = num.length;
      return num.substring(0, len - 8) + "****" + num.substring(len - 4, len);
    }
  }
}
