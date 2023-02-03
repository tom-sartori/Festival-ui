import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from 'src/app/shared/shared.module';
import {ProductsComponent} from './products.component';
import {ListComponent} from './list/list.component';
import {AddComponent} from './add/add.component';

export const routes: Routes = [
  // { path: '', component: ProductsComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListComponent, pathMatch: 'full' },
  { path: 'add', component: AddComponent, pathMatch: 'full' },
  { path: 'add/:id', redirectTo: 'add', pathMatch: 'full' },
  { path: 'update', redirectTo: 'list', pathMatch: 'full' },
  { path: 'update/:id', component: AddComponent, pathMatch: 'full' },

  { path: 'appellations', loadChildren: () => import('./liquid/appellations/appellations.module').then(m => m.AppellationsModule), data: { breadcrumb: 'Appellations' } },
  { path: 'categories', loadChildren: () => import('./shared/categories/categories.module').then(m => m.CategoriesModule), data: { breadcrumb: 'Categories' } },
  { path: 'cuvees', loadChildren: () => import('./liquid/cuvees/cuvees.module').then(m => m.CuveesModule), data: { breadcrumb: 'Cuvees' } },
  { path: 'names', loadChildren: () => import('./shared/names/names.module').then(m => m.NamesModule), data: { breadcrumb: 'Names' } },
  { path: 'varieties', loadChildren: () => import('./liquid/varieties/varieties.module').then(m => m.VarietiesModule), data: { breadcrumb: 'Varieties' } },
  { path: 'vintages', loadChildren: () => import('./liquid/vintage/vintages.module').then(m => m.VintagesModule), data: { breadcrumb: 'Vintages' } }
];

@NgModule({
  declarations: [
    ProductsComponent,
    ListComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProductsModule { }
