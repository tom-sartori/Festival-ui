import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {AccountComponent} from './account.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {PasswordChangeComponent} from './password-change/password-change.component';
import {AddressesComponent} from './addresses/addresses.component';


export const routes: Routes = [
  {
    path: '',
    component: AccountComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'password-change', component: PasswordChangeComponent },
      { path: 'addresses', component: AddressesComponent },
    ]
  }
];


@NgModule({
	declarations: [
		AccountComponent,
		DashboardComponent,
		ProfileComponent,
		PasswordChangeComponent,
		AddressesComponent,
	],
	exports: [
		AddressesComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule
	]
})
export class AccountModule { }