import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-person-data',
  templateUrl: 'person-data.html'
})
export class PersonDataPage {
  //个人资料显示
  @Input('step2Set') step2Set: any;

  //个人资料显示
  @Input('personData') personData: any;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    console.log(this.step2Set);
  }
}
