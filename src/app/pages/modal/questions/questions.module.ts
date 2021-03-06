import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuestionsPage } from './questions.page';
import {HomeResultsPageModule} from '../../home-results/home-results.module';

const routes: Routes = [
  {
    path: '',
    component: QuestionsPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        HomeResultsPageModule
    ],
  declarations: [QuestionsPage]
})
export class QuestionsPageModule {}
