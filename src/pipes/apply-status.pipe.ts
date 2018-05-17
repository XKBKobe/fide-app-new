/**
 * Created by asto on 2017/5/11.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'applyStatus'
})
export class ApplyStatusPipe implements PipeTransform {
  transform(type: string) {
    var status;
    if (type == 'ORG_APPLY') {
      status = '等待审批';
    } else if (type == 'FIRST_TRIAL_PASS') {
      status = '预审通过';
    } else if (type == 'FIRST_TRIAL_REJECT') {
      status = '预审拒绝';
    } else if (type == 'FOLLOW_PASS') {
      status = '协商跟进';
    } else if (type == 'REPLENISH_DATUM') {
      status = '资料待补全';
    } else if (type == 'ACCOUNT_WAIVE') {
      status = '客户放弃';
    } else if (type == 'FINAL_JUDGMENT_PASS') {
      status = '终审通过';
    } else if (type == 'FINAL_JUDGMENT_REJECT') {
      status = '终审拒绝';
    } else if (type == 'AWAIT_SIGN_FINISH') {
      status = '签约完成';
    } else if (type == 'FINISH') {
      status = '贷款终结';
    } else if (type == 'POST_DREWDOWN') {
      status = '还款中';
    } else if (type == 'MERCHANT_APPLY') {
      status = '商家审批';
    } else if (type == 'MERCHANT_APPLY_REJECT') {
      status = '商家拒绝,请重新申请';
    } else if (type == 'MERCHANT_APPLY_PASS') {
      status = '商家通过';
    }
    return status;
  }
}
