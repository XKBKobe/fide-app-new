import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {ImageViewerController} from 'ionic-img-viewer';
import {CordovaService} from "../../../providers/CordovaService";
import {StorageService} from "../../../providers/StorageService";
import {AndroidPermissions} from '@ionic-native/android-permissions';
import {MessageService} from "../../../providers/MessageService";
import {HttpApiService} from "../../../providers/HttpApiService";
import {ImgUploaderService} from "../../../providers/ImgUploaderService";

@Component({
  selector: 'page-identity-check',
  templateUrl: 'identity-check.html'
})
export class IdentityCheckPage {
  //个人资料显示
  @Input('personData') personData: any;

  //step反馈
  @Output() outStepOne: EventEmitter<any> = new EventEmitter<any>();

  //点击跳转到指定界面
  @Output() nextToPageTwo: EventEmitter<number> = new EventEmitter<number>();

  _imageViewerCtrl: ImageViewerController;

  // checkStatus---状态如下：
  // IDSHOW:身份证正反面
  // OCRSHOW:OCR信息
  // CHECKSUCCESS:核身成功
  // CHECKFAIL:核身失败

  checkStatus: any;

  //贷款状态
  loanStatus: any;

  //下一步按钮状态
  checkNext: any = {
    disabled: false,
    hide: true
  };

  //身份证正面
  IDfrontBase64: any;
  //身份证反面
  IDbackBase64: any;
  //身份证正面big
  IDfrontBigImg: any;
  //身份证反面big
  IDbackBigImg: any;

  //核身信息
  getIdInfoData: any = {
    proofMats: {}
  };

  //上传照片
  IDStatus: any = {
    front: false,
    back: false
  };

  //活体检测
  opts: any = {};

  //姓名身份证
  frontInfo: any = {};
  backInfo: any = {};

  //核身报告
  report: any = {};

  //核身成功下一步
  checkSucHidden: boolean = true;

  constructor(public navCtrl: NavController,
              public imageViewerCtrl: ImageViewerController,
              public cordovaService: CordovaService,
              public storage: StorageService,
              private androidPermissions: AndroidPermissions,
              public platform: Platform,
              public message: MessageService,
              public http: HttpApiService,
              public imgUploader: ImgUploaderService) {


  }

  ngOnInit() {
    this.IDfrontBase64 = 'assets/imgs/datum/ID_front_photo.png';
    this.IDbackBase64 = 'assets/imgs/datum/ID_back_photo.png';
    this.IDfrontBigImg = 'assets/imgs/datum/big/IDfrontphotoBig.png';
    this.IDbackBigImg = 'assets/imgs/datum/big/IDbackphotoBig.png';

    this.http.post("getPersonalLoanStatus", {}, false).then(res => {
      this.loanStatus = this;
      //核身通过
      if (res['checkIdentity'] == "1") {
        this.checkStatus = 'CHECKFAIL';
        //下一步不显示
        this.checkNext.hide = true;
        //下一步按钮
        this.checkNext.disabled = false;
        //核身状态
        this.outStepOne.emit({step: 'step1', status: true});

        if (!res['hasApplying']) {
          this.checkSucHidden = false;
        }
        //核身信息
        this.getIdInfo();
      } else if (res['checkIdentity'] == "0") { //核身过一次但是失败
        this.checkStatus = 'CHECKFAIL';
        //下一步显示
        this.checkNext.hide = true;
        //下一步按钮
        this.checkNext.disabled = false;
        //核身状态
        this.outStepOne.emit({step: 'step1', status: false});
        //查询核身信息
        this.getIdInfo();
      } else {
        //默认状态
        this.checkStatus = 'IDSHOW';
        //下一步不显示
        this.checkNext.hide = false;
        //下一步按钮
        this.checkNext.disabled = false;
        //核身状态
        this.outStepOne.emit({step: 'step1', status: false});
      }
    })
  }


  //查用户身份证信息的接口是不是
  getIdInfo() {
    this.http.post('getIdInfo', {}).then(res => {
      this.getIdInfoData = res;
      console.log('getIdInfo  ' + JSON.stringify(res));
    }, err => {
      if (err && err['respCode'] == 101604) {

      }
    })
  }


  checkFrontID(type) {
    let that = this;
    if (that.message.isIos()) {
      that.checkIDCardFront(type);
    } else {
      that.androidPermissions.checkPermission(that.androidPermissions.PERMISSION.CAMERA).then(
        result => {
          if (result.hasPermission) {
            that.checkIDCardFront(type);
          } else {
            that.androidPermissions.requestPermission(that.androidPermissions.PERMISSION.CAMERA).then(result => {
            })
          }
        },
        err => {
          that.androidPermissions.requestPermission(that.androidPermissions.PERMISSION.CAMERA).then(data => {
          })
        }
      );
    }
  }

  checkIDCardFront(type) {
    let that = this;
    that.cordovaService.checkIDCard(type).then(res => {
      //正面
      that.storage.getItem('IDfrontBase64').then(data => {
        that.IDfrontBase64 = data;
        that.IDfrontBigImg = data;
        that.IDStatus.front = true;
        that.frontInfo = JSON.parse(res['response']);
        console.log(data);
      }, err => {
        console.log('IDfrontBase64 ' + err);
      });
      //OCR正面完成
    }, err => {
      console.log(err);
    });
  }


  checkBackID(type) {
    let that = this;
    if (that.message.isIos()) {
      that.checkIDCardBack(type);
    } else {
      that.androidPermissions.checkPermission(that.androidPermissions.PERMISSION.CAMERA).then(
        result => {
          if (result.hasPermission) {
            that.checkIDCardBack(type);
          } else {
            that.androidPermissions.requestPermission(that.androidPermissions.PERMISSION.CAMERA).then(result => {
            })
          }
        },
        err => {
          that.androidPermissions.requestPermission(that.androidPermissions.PERMISSION.CAMERA).then(data => {
          })
        }
      );
    }
  }

  checkIDCardBack(type) {
    let that = this;
    that.cordovaService.checkIDCard(type).then(res => {
      //正面
      that.storage.getItem('IDbackBase64').then(data => {
        that.IDbackBase64 = data;
        that.IDbackBigImg = data;
        that.IDStatus.back = true;
        that.backInfo = JSON.parse(res['response']);
      }, err => {
        console.log('IDbackBase64 ' + err);
      });
      //OCR正面完成
    }, err => {
      console.log(err);
    });
  }


  //下一步
  goPersonInfo() {
    let that = this;
    //显示了OCR信息
    if (this.checkStatus == 'OCRSHOW') {
      this.opts['name'] = this.frontInfo.name;
      this.opts['number'] = this.frontInfo.id_card_number;
      if (that.message.isIos()) {
        that.faceVerify();
      } else {
        that.androidPermissions.checkPermission(that.androidPermissions.PERMISSION.CAMERA).then(
          result => {
            if (result.hasPermission) {
              that.faceVerify();
            } else {
              that.androidPermissions.requestPermission(that.androidPermissions.PERMISSION.CAMERA).then(result => {
              })
            }
          },
          err => {
            that.androidPermissions.requestPermission(that.androidPermissions.PERMISSION.CAMERA).then(data => {
            })
          }
        );
      }
    } else {
      //判断身份证照片是否上传
      if (!that.IDStatus.front || !that.IDStatus.back) {
        return that.message.presentAlert('请上传身份证正反面照');
      } else {
        //显示OCR的信息
        that.checkStatus = 'OCRSHOW';
        //下一步显示
        that.checkNext.hide = false;
        //下一步按钮置灰
        that.checkNext.disabled = false;
      }
    }
  }

  faceVerify() {
    let that = this;
    that.cordovaService.verifyFace(this.opts).then(res => {
      console.log('活体检测返回', JSON.stringify(res));
      let result = JSON.parse(res['response']);
      that.report.source = '1';
      //上传成功判断相似度大于60
      if (result['result_faceid'].confidence > 60) {
        //核身结果pass
        that.report.pass = true;
      } else {
        //核身结果未通过
        that.report.pass = false;
      }
      that.report.name = that.frontInfo.name;
      that.report.idNumber = that.frontInfo.id_card_number;
      //核身接口请求ID
      that.report.requestId = result.request_id;
      //核身结果的集合
      if (result.result_faceid) {
        that.report.resultFaceid = JSON.stringify(result.result_faceid);
      }
      //网格照片
      that.report.idImage = '';

      that.storage.getItem('imageBest').then(imageBest => {

        that.imgUploader.upload(imageBest).then(result => {
          that.report.imageBest = result['data']['fileid'];
          //上传核身报告
          that.uploadReport();
        })

      }, err => {
        console.log('imageBest  ' + err);
      });

    }, err => {
      console.log('活体检测返回', JSON.stringify(err));
      //插件返回动作不规范的错误
      if (err.indexOf('cordova') != -1) {
        console.log('cordovaTest');
        let reason = err.replace('cordova', '');
        let time = setTimeout(function () {
          that.message.showToast(reason);
          clearTimeout(time);
        }, 1500);
        //下一步显示
        that.checkNext.hide = false;
        //点击置灰
        that.checkNext.disabled = false;
      }
    })
  }

  //上传核身报告
  uploadReport() {
    let that = this;
    //身份证签发机关
    that.report.idIssued = that.backInfo.issued_by;
    //idvalidDate; //身份证有效期限
    that.report.idvalidDate = that.backInfo.valid_date;
    //新增住宅地址
    that.report.liveaddr = that.frontInfo.address;
    //身份证正面
    that.storage.getItem('IDfrontBase64').then(data => {
      that.imgUploader.upload(data).then(result => {
        let _data = {
          "matName": '身份证正面',
          "proofMatUuid": !!that.personData['identity']['proofMatUuid'] ? that.personData['identity']['proofMatUuid'] : '',
          "matTypeCode": 'USER_IDENTITY',
          "matUrl": result['data']['fileid']
        };

        that.http.post("filesubmit", _data).then(res => {
          //身份证反面
          that.storage.getItem('IDbackBase64').then(data => {
            that.imgUploader.upload(data).then(result => {
              let _data = {
                "matName": '身份证反面',
                "proofMatUuid": !!that.personData['identityBack']['proofMatUuid'] ? that.personData['identityBack']['proofMatUuid'] : '',
                "matTypeCode": 'USER_IDENTITY_BACK',
                "matUrl": result['data']['fileid']
              };
              //上传反面
              that.http.post("filesubmit", _data).then(res => {
                //上传核身报告
                that.http.post('checkPersonIdentity', this.report).then(res => {
                  //通过
                  if (!!that.report.pass) {
                    that.checkStatus = 'CHECKSUCCESS';
                    //核身状态
                    that.outStepOne.emit({step: 'step1', status: true});
                    //成功按钮显示
                    if (!that.loanStatus['hasApplying']) {
                      that.checkSucHidden = false;
                    }
                  } else {
                    that.checkStatus = 'CHECKFAIL';
                    //核身状态
                    that.outStepOne.emit({step: 'step1', status: false});
                  }
                  //下一步不显示
                  that.checkNext.hide = true;
                  //下一步按钮
                  that.checkNext.disabled = false;
                  //核身信息
                  that.getIdInfo();
                })
              }, err => {
                if (err && err['respCode'] == 101604) {

                }
              })
            })
          })
        }, err => {
          if (err && err['respCode'] == 101604) {

          }
        })
      })
    })
  }

  //重新核身
  reCheck() {
    this.checkStatus = 'IDSHOW';
    // todo 身份证重新上传
    this.IDStatus.back = false;
    this.IDStatus.front = false;
    //下一步显示
    this.checkNext.hide = false;
    //下一步按钮不置灰
    this.checkNext.disabled = false;
    //默认设置
    this.IDfrontBase64 = 'assets/imgs/datum/ID_front_photo.png';
    this.IDbackBase64 = 'assets/imgs/datum/ID_back_photo.png';
    this.IDfrontBigImg = 'assets/imgs/datum/big/IDfrontphotoBig.png';
    this.IDbackBigImg = 'assets/imgs/datum/big/IDbackphotoBig.png';
  }

  //跳到第二步
  nextStep() {
    this.nextToPageTwo.emit(3);
  }
}
