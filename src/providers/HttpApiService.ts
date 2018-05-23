import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as CryptoJS from 'crypto-js'
import {HTTP_URL_JSON} from "./HttpSettings";
import {MessageService} from "./MessageService";
import {APPSTATUS, BASIC_SETTINGS_JSON, CONSTANTS} from "./BaseConfig";
import {StorageService} from "./StorageService";


@Injectable()
export class HttpApiService {
  constructor(public http: HttpClient,
              public message: MessageService,
              public storage: StorageService) {

  }

  /**
   * post请求  url：请求的地址  data：请求的body  isLoading：是否加载请求loading   isThis：this是否传递
   * */

  post(url: string, data: any, isLoading: boolean = true) {

    let path = HTTP_URL_JSON[url].server + HTTP_URL_JSON[url].url;
    let aesUrl = BASIC_SETTINGS_JSON.fideServer + CryptoJS.AES.encrypt(path, 'fide');

    return new Promise((resolve, reject) => {
      this.storage.getItem(APPSTATUS.SUCCESS_TOKEN).then(token => {
        console.log(token);
        !!isLoading ? this.message.showLoading() : null;
        let headers = new HttpHeaders()
          .append("Content-Type", "application/x-www-form-urlencoded");
        data.orgCode = CONSTANTS.orgCode;
        data.token = token;
        console.log('请求地址：' + BASIC_SETTINGS_JSON.fideServer + path + '请求参数：');
        console.log(data);
        const body = new URLSearchParams();
        var cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), 'fide');
        var cipherData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(cipherText.toString()));
        body.set("cdata", cipherData);

        this.http.post(aesUrl, body.toString(), {headers: headers}).subscribe(res => {
          console.log('请求地址：' + BASIC_SETTINGS_JSON.fideServer + path + '返回数据：');
          console.log(res);
          this.message.hideLoading();
          let respCode = res['respCode'];
          if (respCode != '100200') {
            // if (respCode != '101704' && respCode != '101705' && respCode != '101604') {
              this.message.showToastTop(res['respMsg']);
            // }
            reject(res);
          } else {
            res.hasOwnProperty('data') ? resolve(res['data']) : resolve(res);
          }
        }, err => {
          console.log(err);
          this.message.hideLoading();
          reject(err);
        })
      });
    })
  }
}
