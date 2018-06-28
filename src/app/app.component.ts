import {Component, ViewChild} from '@angular/core';
import {App, IonicApp, NavController, Platform, Tabs} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AppMinimize} from '@ionic-native/app-minimize';
import {TabsPage} from '../pages/tabs/tabs';
import {MessageService} from "../providers/MessageService";
import {StorageService} from "../providers/StorageService";
import {LoginPage} from "../pages/welcome/login";
import {GuidePage} from "../pages/welcome/guide-page/guide-page";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mainTabs') tabs: Tabs;

  backButtonPressed: boolean = false;  //用于判断返回键是否触发

  // rootPage: any = TabsPage;

  constructor(statusBar: StatusBar,
              splashScreen: SplashScreen,
              public platform: Platform,
              public ionicApp: IonicApp,
              private appMinimize: AppMinimize,
              public app: App,
              public message: MessageService,
              public storage:StorageService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //进去app
      this.goToApp();
      //back register
      this.registerBackButtonAction();
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

      let activeNav: NavController = this.app.getActiveNav();
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
      this.message.showToastBottom('再按一次退出应用');
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }

  //进入app
  goToApp() {
    var token = localStorage.getItem("token");
    //是否是第一次进入app
    this.storage.getItem('firstIn').then(res => {
      //已经进入过了
      if (!!res) {
        //登录过的
        if (!!token) {
          this.app.getRootNav().setRoot(TabsPage);
        } else {
          this.app.getRootNav().setRoot(LoginPage);
        }
      } else {
        this.app.getRootNav().setRoot(GuidePage);
      }
    }, err => {
      console.log('firstIn ' + err);
    });
  }
}
