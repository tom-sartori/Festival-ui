import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {VolunteersComponent} from "./volunteers.component";

export const routes: Routes = [
    { path: '', component: VolunteersComponent, pathMatch: 'full'  }
];

@NgModule({
    declarations: [VolunteersComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule
    ]
})
export class VolunteersModule { }
