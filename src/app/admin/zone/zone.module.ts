import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent as ZoneListComponent } from './list/list.component';
import { SlotListComponent } from './slot/slot-list/slot-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AddComponent } from './add/add.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { SlotDialogComponent } from './slot/slot-dialog/slot-dialog.component';


export const routes: Routes = [
	{ path: '', component: ZoneListComponent, pathMatch: 'full' },
	{ path: 'add', component: AddComponent, pathMatch: 'full' },
	{ path: 'update/:id', component: AddComponent, pathMatch: 'full' },
	{ path: 'update/', redirectTo: 'add', pathMatch: 'full' },
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
	declarations: [
		ZoneListComponent,
		AddComponent,
		SlotListComponent,
        SlotDialogComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
		CdkAccordionModule
	]
})
export class ZoneModule {
}
