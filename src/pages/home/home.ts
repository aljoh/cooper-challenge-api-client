import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PersonProvider } from '../../providers/person/person';
import { PerfomanceDataProvider } from '../../providers/perfomance-data/perfomance-data';
import { ModalController } from 'ionic-angular';
import { ResultsPage } from '../../pages/results/results';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any = {};

  constructor(
    public navCtrl: NavController,
    public person: PersonProvider,
    public performancedata: PerfomanceDataProvider,
    public modalCtrl: ModalController
  ) {
    this.user = { distance: 1000, age: 20, gender: 'female' };
  }

  calculate() {
    this.person.age = this.user.age;
    this.person.gender = this.user.gender;

    this.person.doAssessment(this.user.distance);
    console.log(this.person.assessmentMessage);
  }

  saveResults() {
    this.performancedata
      .saveData({ performance_data: { data: { message: this.person.assessmentMessage } } })
      .subscribe(data => console.log(data));

  }

  showResults() {
    this.modalCtrl.create(ResultsPage).present();
  }


}
