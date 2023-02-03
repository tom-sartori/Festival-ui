import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {PipesModule} from '../../theme/pipes/pipes.module';
import {ProductComponent} from './product.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';

export const routes: Routes = [
  { path: '', component: ProductComponent, pathMatch: 'full' },
  { path: ':id', component: ProductDetailComponent }
];

@NgModule({
	declarations: [
		ProductComponent,
		ProductDetailComponent
	],
	exports: [
		ProductDetailComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
		PipesModule
	]
})
export class ProductModule { }
