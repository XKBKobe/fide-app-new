import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HttpClientModule} from '@angular/common/http';


//native
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Toast} from '@ionic-native/toast';
import {IonicStorageModule} from '@ionic/storage';

//service
import {HttpApiService} from "../providers/HttpApiService";
import {MessageService} from "../providers/MessageService";
import {StorageService} from "../providers/StorageService";

//pages
import {MyHomePage} from "../pages/myHome/my-home";
import {MyLoanPage} from "../pages/myLoan/my-loan";
import {MyDataPage} from "../pages/myData/my-data";
import {MyCenterPage} from "../pages/myCenter/my-center";
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from "../pages/welcome/login";
import {ProductDetailPage} from "../pages/myHome/product-detail/product-detail";



@NgModule({
  declarations: [
    MyApp,
    MyHomePage,
    MyLoanPage,
    MyDataPage,
    MyCenterPage,
    LoginPage,
    TabsPage,
    ProductDetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyHomePage,
    MyLoanPage,
    MyDataPage,
    MyCenterPage,
    LoginPage,
    TabsPage,
    ProductDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpApiService,
    MessageService,
    StorageService
  ]
})
export class AppModule {
}
