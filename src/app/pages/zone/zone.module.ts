import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ZoneComponent} from "@pages/zone/zone.component";
import {SharedModule} from "@shared/shared.module";


export const routes: Routes = [
  { path: '', component: ZoneComponent, pathMatch: 'full'  }
];
@NgModule({
  declarations: [
      ZoneComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ZoneModule { }
