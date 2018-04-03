import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';


//native
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';


//pages
import {MyHomePage} from "../pages/myHome/my-home";
import {MyLoanPage} from "../pages/myLoan/my-loan";
import {MyDataPage} from "../pages/myData/my-data";
import {MyCenterPage} from "../pages/myCenter/my-center";
import {TabsPage} from '../pages/tabs/tabs';


@NgModule({
  declarations: [
    MyApp,
    MyHomePage,
    MyLoanPage,
    MyDataPage,
    MyCenterPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyHomePage,
    MyLoanPage,
    MyDataPage,
    MyCenterPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
