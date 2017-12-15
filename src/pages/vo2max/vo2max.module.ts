import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Vo2maxPage } from './vo2max';

@NgModule({
  declarations: [
    Vo2maxPage,
  ],
  imports: [
    IonicPageModule.forChild(Vo2maxPage),
  ],
})
export class Vo2maxPageModule {}
