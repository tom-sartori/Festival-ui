import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {DialogComponent} from './dialog/dialog.component';
import {VintagesComponent} from './vintages.component';

export const routes: Routes = [
  { path: '', component: VintagesComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    VintagesComponent,
    ListComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class VintagesModule { }
