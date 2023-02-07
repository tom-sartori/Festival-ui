import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {PagesComponent} from './pages/pages.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent, children: [
            { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
            { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
            { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
            { path: 'product', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) },
            { path: 'chefs', loadChildren: () => import('./pages/chefs/chefs.module').then(m => m.ChefsModule) },
            { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule) },
            { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
            { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
            { path:'volunteer', loadChildren: () => import('./pages/volunteers/volunteers.module').then(m => m.VolunteersModule)}
        ]
    },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
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
export class AppRoutingModule { }
