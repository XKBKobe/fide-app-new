import {Component} from '@angular/core';

import {ContactPage} from '../contact/contact';
import {HomePage} from '../home/home';
import {MyLoanPage} from "../myLoan/my-loan";
import {MyDataPage} from "../myData/my-data";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MyLoanPage;
  tab3Root = MyDataPage;
  tab4Root = ContactPage;

  constructor() {

  }
}
