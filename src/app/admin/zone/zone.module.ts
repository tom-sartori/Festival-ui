import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AddComponent } from './add/add.component';
import { SlotListComponent } from '@admin/zone/slot/slot-list/slot-list.component';
import { SlotDialogComponent } from '@admin/zone/slot/slot-dialog/slot-dialog.component';


export const routes: Routes = [
	{ path: '', component: ListComponent, pathMatch: 'full' },
	{ path: 'add', component: AddComponent, pathMatch: 'full' },
	{ path: 'update/:id', component: AddComponent, pathMatch: 'full' },
	{ path: 'update/', redirectTo: 'add', pathMatch: 'full' },
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
	declarations: [
		ListComponent,
		AddComponent,
		SlotListComponent,
		SlotDialogComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule
	]
})
export class ZoneModule { }
