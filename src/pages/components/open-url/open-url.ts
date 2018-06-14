import {Component, EventEmitter, Output} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Events, NavParams} from 'ionic-angular';


@Component({
  selector: 'open_url',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>{{title}}</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content class="open-url-view-content">
      <div id="iframeContainer">
        <iframe [src]="safeUrl"></iframe>
      </div>
    </ion-content>
  `
})

export class OpenUrlPage {
  title: String;
  safeUrl: SafeResourceUrl;
  notifyResult: any;
  onMessage: any;
  accessToken: any;
  timer: any;

  //点击跳转到指定界面
  @Output() refresh: EventEmitter<any> = new EventEmitter<any>();

  constructor(public navParams: NavParams,
              public sanitizer: DomSanitizer,
              public events: Events) {
    this.title = navParams.get('title');
    this.onMessage = navParams.get('onMessage');
    this.accessToken = navParams.get('accessToken');

    let url = navParams.get('url');
    this.safeUrl = sanitizer.bypassSecurityTrustResourceUrl(url);
    this.notifyResult = navParams.get('notifyResult');

  }

  ionViewDidLoad() {

  }

  ionViewDidLeave() {
    this.events.publish('notifyResult', true);
  }
}
