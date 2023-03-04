import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

export const routes: Routes = [
  { path: '', component: LogoutComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    LogoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class LogoutModule { }
