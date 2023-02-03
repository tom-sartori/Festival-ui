import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppellationsComponent} from './appellations.component';
import {ListComponent} from './list/list.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {DialogComponent} from './dialog/dialog.component';

export const routes: Routes = [
  { path: '', component: AppellationsComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppellationsComponent,
    ListComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AppellationsModule { }
