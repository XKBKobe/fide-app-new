import {Component, ViewChild} from '@angular/core';
import {App, IonicApp, NavController, Platform, Tabs} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AppMinimize} from '@ionic-native/app-minimize';
import {TabsPage} from '../pages/tabs/tabs';
import {MessageService} from "../providers/MessageService";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mainTabs') tabs: Tabs;

  backButtonPressed: boolean = false;  //用于判断返回键是否触发

  rootPage: any = TabsPage;

  constructor(statusBar: StatusBar,
              splashScreen: SplashScreen,
              public platform: Platform,
              public ionicApp: IonicApp,
              private appMinimize: AppMinimize,
              public appCtrl: App,
              public message: MessageService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //todo
      // this.registerBackButtonAction();
    });
  }

  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() ||this.ionicApp._loadingPortal.getActive()|| this.ionicApp._overlayPortal.getActive() || this.ionicApp._modalPortal.getActive()
      let activePortal = this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive();
      if (activePortal) {
        activePortal.dismiss().catch(() => {
        });
        activePortal.onDidDismiss(() => {
        });
        return;
      }

      let activeNav: NavController = this.appCtrl.getActiveNav();
      if (activeNav.canGoBack()) {
        activeNav.pop();
      } else {
        if (this.tabs == null || this.tabs._selectHistory[this.tabs._selectHistory.length - 1] === this.tabs.getByIndex(0).id) {
          //执行退出
          this.showExit();
        } else {
          //选择首页第一个的标签
          this.tabs.select(0);
        }
      }
    }, 101);
  }


  //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.appMinimize.minimize();
      this.platform.exitApp();
    } else {
      this.message.showToast('再按一次退出应用');
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }
}
