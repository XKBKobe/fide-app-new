import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HttpClientModule} from '@angular/common/http';


//native
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Toast} from '@ionic-native/toast';
import {IonicImageViewerModule} from 'ionic-img-viewer';
import {CityPickerModule} from "ionic2-city-picker";
import {AppMinimize} from '@ionic-native/app-minimize';
import {File} from '@ionic-native/file';
import {FileTransfer} from '@ionic-native/file-transfer';
import {IonicStorageModule} from '@ionic/storage';
import {AndroidPermissions} from '@ionic-native/android-permissions';
// import {CityPickerModule} from  "../modules/picker";

//service
import {HttpApiService} from "../providers/HttpApiService";
import {MessageService} from "../providers/MessageService";
import {CommonService} from "../providers/commonService";
import {DataSaveService} from "../providers/DataSaveService";
import {UtilsService} from "../providers/UtilsService";
import {StorageService} from "../providers/StorageService";
import {CordovaService} from "../providers/CordovaService";

//pipes
import {ProductTypePipe} from "../pipes/product-type.pipe";
import {ProductRatePipe} from "../pipes/product-rate.pipe";
import {ChargeTypePipe} from "../pipes/charge-type.pipe";
import {TargetCustomerPipe} from "../pipes/target-customer.pipe";
import {ProductRowPipe} from "../pipes/productRow.pipe";
import {ApplyStatusPipe} from "../pipes/apply-status.pipe";
import {LoanAmountPipe} from "../pipes/loan-amount.pipe";
import {BankFormatPipe} from "../pipes/bank-format.pipe";
import {PosTypePipe} from "../pipes/pos-type.pipe";
import {OtoTypePipe} from "../pipes/oto-type.pipe";


//pages
import {MyHomePage} from "../pages/myHome/my-home";
import {MyLoanPage} from "../pages/myLoan/my-loan";
import {MyDataPage} from "../pages/myData/my-data";
import {MyCenterPage} from "../pages/myCenter/my-center";
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from "../pages/welcome/login";
import {ProductDetailPage} from "../pages/myHome/product-detail/product-detail";
import {LoanProgress} from "../pages/myHome/loan-progress/loan-progress";
import {LoanStepHeadPage} from "../pages/components/loan-step-head/loan-step-head";
import {IdentityCheckPage} from "../pages/components/identity-check/identity-check";
import {PersonDataPage} from "../pages/components/person-data/person-data";
import {BasicsDataPage} from "../pages/components/basics-data/basics-data";
import {CreditDataPage} from "../pages/components/credit-data/credit-data";
import {LoanStepOnePage} from "../pages/myHome/loan-progress/loan-step-one/loan-step-one";
import {LoanStepTwoPage} from "../pages/myHome/loan-progress/loan-step-two/loan-step-two";
import {LoanStepThreePage} from "../pages/myHome/loan-progress/loan-step-three/loan-step-three";
import {LoanStepFourPage} from "../pages/myHome/loan-progress/loan-step-foure/loan-step-four";
import {LoanStepFivePage} from "../pages/myHome/loan-progress/loan-step-five/loan-step-five";
import {ImgViewPage} from "../pages/components/img-view/img-view";
import {NearbyBankPage} from "../pages/components/nearby-bank/nearby-bank";
import {PerDataPage} from "../pages/myData/per-data/per-data";
import {BasDataPage} from "../pages/myData/bas-data/bas-data";
import {CreDataPage} from "../pages/myData/cre-data/cre-data";
import {ApproveRecordPage} from "../pages/myLoan/approve-record/approve-record";
import {BasicInfoPage} from "../pages/myCenter/basic-info/basic-info";
import {ChangePasswordPage} from "../pages/myCenter/change-password/change-password";
import {AlipayPage} from "../pages/myData/cre-data/alipay/alipay";
import {TobaccoPage} from "../pages/myData/cre-data/tobacco/tobacco";
import {FundPage} from "../pages/myData/cre-data/fund/fund";
import {BankPage} from "../pages/myData/cre-data/bank/bank";
import {PosPage} from "../pages/myData/cre-data/pos/pos";
import {OtoPage} from "../pages/myData/cre-data/oto/oto";
import {PerCreditPage} from "../pages/myData/cre-data/per-credit/per-credit";
import {OpenUrlPage} from "../pages/components/open-url/open-url";
import {AddBankPage} from "../pages/myLoan/bank/add-bank/add-bank";
import {SelectCityPage} from "../pages/myHome/select-city/select-city";


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
    ProductRowPipe,
    LoanProgress,
    LoanStepHeadPage,
    IdentityCheckPage,
    PersonDataPage,
    BasicsDataPage,
    CreditDataPage,
    LoanStepOnePage,
    LoanStepTwoPage,
    LoanStepThreePage,
    LoanStepFourPage,
    LoanStepFivePage,
    ImgViewPage,
    NearbyBankPage,
    ApplyStatusPipe,
    PerDataPage,
    BasDataPage,
    CreDataPage,
    ApproveRecordPage,
    LoanAmountPipe,
    BasicInfoPage,
    ChangePasswordPage,
    AlipayPage,
    TobaccoPage,
    FundPage,
    BankPage,
    BankFormatPipe,
    PosPage,
    PosTypePipe,
    OtoTypePipe,
    OtoPage,
    PerCreditPage,
    OpenUrlPage,
    AddBankPage,
    SelectCityPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicImageViewerModule,
    CityPickerModule,
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
    ProductDetailPage,
    LoanProgress,
    LoanStepHeadPage,
    IdentityCheckPage,
    PersonDataPage,
    BasicsDataPage,
    CreditDataPage,
    LoanStepOnePage,
    LoanStepTwoPage,
    LoanStepThreePage,
    LoanStepFourPage,
    LoanStepFivePage,
    ImgViewPage,
    NearbyBankPage,
    PerDataPage,
    BasDataPage,
    CreDataPage,
    ApproveRecordPage,
    BasicInfoPage,
    ChangePasswordPage,
    AlipayPage,
    TobaccoPage,
    FundPage,
    BankPage,
    PosPage,
    OtoPage,
    PerCreditPage,
    OpenUrlPage,
    AddBankPage,
    SelectCityPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Toast,
    AppMinimize,
    File,
    FileTransfer,
    AndroidPermissions,
    StorageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpApiService,
    MessageService,
    CordovaService,
    CommonService,
    DataSaveService,
    UtilsService
  ]
})
export class AppModule {
}
