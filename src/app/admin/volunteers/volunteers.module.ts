import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {VolunteersComponent} from "./volunteers.component";
import {ListComponent} from "./list/list.component";
import {SharedModule} from "../../shared/shared.module";
import { AddComponent } from './add/add.component';

export const routes: Routes = [
  { path: '', component: VolunteersComponent, pathMatch: 'full' },
  { path: 'add', component: AddComponent, pathMatch: 'full' },
  { path: 'update', redirectTo: 'list', pathMatch: 'full' },
  { path: 'update/:id', component: AddComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    VolunteersComponent,
    ListComponent,
    AddComponent
  ],
  exports: [
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class VolunteersModule { }
