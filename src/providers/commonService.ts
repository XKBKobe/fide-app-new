import {Injectable} from '@angular/core';
import {BASICS_DATA, CREDIT_DATA_SETTING, PERSON_DATA} from "./BaseConfig";

@Injectable()
export class CommonService {

  avaPeriods:any;

  constructor() {
  }

  //资料基础资料配置
  checkMaterial(personData, settings, step, cb) {
    switch (step) {
      case 'step2':
        let privateMat = settings.split("|");
        for (var i in PERSON_DATA) {
          if (_.contains(privateMat, i)) {
            PERSON_DATA[i].isShow = true;
          } else if (_.contains(privateMat, "$" + i)) {
            PERSON_DATA[i].isShow = true;
            PERSON_DATA[i].isRequire = true;
          }
        }
        cb(PERSON_DATA);
        break;

      case 'step3':
        let basicMat = settings.split("|");
        for (var i in BASICS_DATA) {
          if (_.contains(basicMat, i)) {
            BASICS_DATA[i].isShow = true;
          } else if (_.contains(basicMat, "$" + i)) {
            BASICS_DATA[i].isShow = true;
            BASICS_DATA[i].isRequire = true;
          }
        }
        cb(BASICS_DATA);
        break;

      case 'step4':
        let dataSource = settings.split("|");
        for (var i in CREDIT_DATA_SETTING) {
          if (_.contains(dataSource, i)) {
            CREDIT_DATA_SETTING[i].isShow = true;
          } else if (_.contains(dataSource, "$" + i)) {
            CREDIT_DATA_SETTING[i].isShow = true;
            CREDIT_DATA_SETTING[i].isRequire = true;
          }
        }
        cb(CREDIT_DATA_SETTING);
        break;
    }
  }


}
