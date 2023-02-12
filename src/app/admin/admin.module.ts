import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {AdminComponent} from './admin.component';
import {MenuComponent} from './components/menu/menu.component';
import {UserMenuComponent} from './components/user-menu/user-menu.component';
import {FullScreenComponent} from './components/fullscreen/fullscreen.component';
import {MessagesComponent} from './components/messages/messages.component';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';

export const routes = [
  {
    path: '',
    component: AdminComponent, children: [
      { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'game', loadChildren: () => import('./game/game.module').then(m => m.GameModule), data: { breadcrumb: 'Game' } },
      { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule), data: { breadcrumb: 'Products' } },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), data: { breadcrumb: 'Users' } },
      { path: 'analytics', loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule), data: { breadcrumb: 'Analytics' } },
    ]
  }
];


@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    UserMenuComponent,
    FullScreenComponent,
    MessagesComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AdminModule { }
