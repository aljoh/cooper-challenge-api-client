import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PerfomanceDataProvider } from '../../providers/perfomance-data/perfomance-data';

@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  results = [];
  constructor(
    private performanceData: PerfomanceDataProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
    this.performanceData
      .getResults()
      .subscribe(data => (this.results = data.entries));
  }

  closeModal() {
    this.navCtrl.pop();
  }

}
