import {Component} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {NavParams} from 'ionic-angular';


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
  onMessage: any;
  accessToken: any;
  timer: any;

  constructor(public navParams: NavParams,
              public sanitizer: DomSanitizer) {
    this.title = navParams.get('title');
    this.onMessage = navParams.get('onMessage');
    this.accessToken = navParams.get('accessToken');

    let url = navParams.get('url');
    this.safeUrl = sanitizer.bypassSecurityTrustResourceUrl(url);

  }

  ionViewDidLoad() {

  }

  ionViewDidLeave() {

  }
}
