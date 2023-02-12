import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {DialogComponent} from './dialog/dialog.component';
import {CategoriesComponent} from './categories.component';

export const routes: Routes = [
  { path: '', component: CategoriesComponent, pathMatch: 'full' }
];

@NgModule({
    declarations: [
        CategoriesComponent,
        ListComponent,
        DialogComponent
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
export class CategoriesModule { }
