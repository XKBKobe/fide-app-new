import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as CryptoJS from 'crypto-js'
import {HTTP_URL_JSON} from "./HttpSettings";
import {MessageService} from "./MessageService";
import {BASIC_SETTINGS_JSON, CONSTANTS} from "./BaseConfig";


@Injectable()
export class HttpApiService {
  constructor(public http: HttpClient,
              public message: MessageService) {

  }

  /**
   * post请求  url：请求的地址  data：请求的body  isLoading：是否加载请求loading   isThis：this是否传递
   * */

  post(url: string, data: any, isLoading: boolean = true, isThis?: any) {

    let path = HTTP_URL_JSON[url].server + HTTP_URL_JSON[url].url;
    let aesUrl = BASIC_SETTINGS_JSON.fideServer + CryptoJS.AES.encrypt(path, 'fide');
    data.orgCode = CONSTANTS.orgCode;

    const body = new URLSearchParams();
    var cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), 'fide');
    var cipherData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(cipherText.toString()));
    body.set("cdata", cipherData);

    return new Promise((resolve, reject) => {
      !!isLoading ? this.message.showLoading() : null;
      let headers = new HttpHeaders()
        .append("Content-Type", "application/x-www-form-urlencoded");

      this.http.post(aesUrl, body.toString(), {headers: headers}).subscribe(res => {
        console.log(res);
        this.message.hideLoading();
        resolve(res);
      }, err => {
        console.log(err);
        this.message.hideLoading();
        reject(err);
      })
    })
  }
}
