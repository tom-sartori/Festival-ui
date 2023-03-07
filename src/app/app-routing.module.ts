import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { PagesComponent } from '@pages/pages.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { AuthGuard } from '@app/guards/auth.guard';
import {DetailsComponent} from "@pages/zone/details/details.component";


const routes: Routes = [
    {
        path: '',
        component: PagesComponent, children: [
            { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
            { path: 'game', loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule) },
            { path: 'volunteer', loadChildren: () => import('./pages/volunteers/volunteers.module').then(m => m.VolunteersModule) },
            { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
            { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
            { path: 'logout', loadChildren: () => import('./pages/logout/logout.module').then(m => m.LogoutModule), canActivate: [AuthGuard] }
            { path:'zone', loadChildren: () => import('./pages/zone/zone.module').then(m => m.ZoneModule)},
            { path: 'details/:id', component: DetailsComponent }
        ]
    },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
    { path: 'home', redirectTo: '' },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
            initialNavigation: 'enabledBlocking', // for one load page, without reload
            relativeLinkResolution: 'legacy'
            // useHash: true
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
    public static routes: Routes = routes;
}
