import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ZoneComponent} from "@pages/zone/zone.component";
import {SharedModule} from "@shared/shared.module";
import {DetailsComponent} from "@pages/zone/details/details.component";


export const routes: Routes = [
  { path: '', component: ZoneComponent, pathMatch: 'full'  },
  { path: ':id', component: DetailsComponent}
];
@NgModule({
  declarations: [
      ZoneComponent,
      DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ZoneModule { }
