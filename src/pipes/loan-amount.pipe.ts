/**
 * Created by asto on 2017/5/11.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'loanAmount'
})
export class LoanAmountPipe implements PipeTransform {
  transform(applyAmount: number, approvedAmount: number) {
    let loanAmount;
    approvedAmount > 0 ? loanAmount = '授信额度：' + (approvedAmount / 10000).toFixed(2) : loanAmount = '申请额度：' + (applyAmount / 10000).toFixed(2);
    return loanAmount;
  }
}
