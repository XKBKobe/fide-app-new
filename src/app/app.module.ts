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

//pipes
import {ProductTypePipe} from "../pipes/product-type.pipe";
import {ProductRatePipe} from "../pipes/product-rate.pipe";
import {ChargeTypePipe} from "../pipes/charge-type.pipe";
import {TargetCustomerPipe} from "../pipes/target-customer.pipe";
import {ProductRowPipe} from "../pipes/productRow.pipe";


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
    ProductDetailPage,
    ProductTypePipe,
    ProductRatePipe,
    ChargeTypePipe,
    TargetCustomerPipe,
    ProductRowPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      platforms: {
        ios: {
          backButtonText: '',
          swipeBackEnabled: true
        },
        android: {
          backButtonIcon: 'ios-arrow-back',
          activator: 'none'
        }
      }
    }),
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
