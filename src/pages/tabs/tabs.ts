import {Component, ViewChild} from '@angular/core';
import {Tabs} from 'ionic-angular';
import {MyHomePage} from "../myHome/my-home";
import {MyLoanPage} from "../myLoan/my-loan";
import {MyDataPage} from "../myData/my-data";
import {MyCenterPage} from "../myCenter/my-center";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs: Tabs;
  tab1Root = MyHomePage;
  tab2Root = MyLoanPage;
  tab3Root = MyDataPage;
  tab4Root = MyCenterPage;

  constructor() {

  }
}
