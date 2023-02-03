import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {DialogComponent} from './dialog/dialog.component';
import {NamesComponent} from './names.component';

export const routes: Routes = [
  { path: '', component: NamesComponent, pathMatch: 'full' }
];

@NgModule({
	declarations: [
		NamesComponent,
		ListComponent,
		DialogComponent
	],
	exports: [
		DialogComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule
	]
})
export class NamesModule { }
