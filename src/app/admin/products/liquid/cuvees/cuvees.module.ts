import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {CuveesComponent} from './cuvees.component';
import {DialogComponent} from './dialog/dialog.component';

export const routes: Routes = [
  { path: '', component: CuveesComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    CuveesComponent,
    ListComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CuveesModule { }
