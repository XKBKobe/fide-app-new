/**
 * Created by asto on 2017/6/2.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'targetCustomer',
  pure: false
})
export class TargetCustomerPipe implements PipeTransform {
  transform(target: any) {
    if (target) {
      //目标客户群
      let targetAll = {'1': '企业主', '2': '白领', '3': '蓝领', '4': '自由职业者'};
      let targetText = '';
      let isFisrt = false;
      if (target) {
        if (target.indexOf('|') > 0) {
          var targetArr = target.split('|');
          for (var i in targetArr) {
            for (var j in targetAll) {
              if (targetArr[i] == j) {
                if (isFisrt) {
                  targetText = targetText + '-' + targetAll[j];
                } else {
                  isFisrt = true;
                  targetText = targetText + targetAll[j];
                }

              }
            }
          }
        } else {
          for (var j in targetAll) {
            if (target == j) {
              targetText = targetText + targetAll[j];
            }
          }
        }
      }
      return targetText;
    }
  }
}
