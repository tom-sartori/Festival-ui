import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {ListComponent} from './list/list.component';
import {DialogComponent} from './dialog/dialog.component';

export const routes: Routes = [
  { path: '', component: ListComponent, pathMatch: 'full'  },
  { path: '**', redirectTo: '', pathMatch: 'full'  }
];

@NgModule({
  declarations: [
    ListComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule  ]
})
export class GameModule { }
