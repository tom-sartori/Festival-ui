import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminComponent } from './admin.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { FullScreenComponent } from './components/fullscreen/fullscreen.component';
import { MessagesComponent } from './components/messages/messages.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

export const routes = [
  {
    path: '',
    component: AdminComponent, children: [
      { path: 'zone', loadChildren: () => import('./zone/zone.module').then(m => m.ZoneModule), data: { breadcrumb: 'Zone' } },
	  { path: 'game', loadChildren: () => import('./game/game.module').then(m => m.GameModule), data: { breadcrumb: 'Game' } },
	  { path: 'volunteer', loadChildren: () => import('./volunteers/volunteers.module').then(m => m.VolunteersModule), data: { breadcrumb: 'Volunteer' } },
	  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), data: { breadcrumb: 'Dashboard' } },
	  { path: 'analytics', loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule), data: { breadcrumb: 'Analytics' } }
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
export class AdminModule {
}
