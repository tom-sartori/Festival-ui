import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {VarietiesComponent} from './varieties.component';
import {DialogComponent} from './dialog/dialog.component';

export const routes: Routes = [
  { path: '', component: VarietiesComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    VarietiesComponent,
    ListComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class VarietiesModule { }
