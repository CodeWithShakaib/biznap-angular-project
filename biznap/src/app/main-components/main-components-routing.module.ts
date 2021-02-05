import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from './../shell/shell.service';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { DashboardComponent } from './dashboard/dashboard.component';

import { UsersListingComponent } from './Users/users-listing/users-listing.component';
import { AddUserComponent } from './Users/add-user/add-user.component';
import { EditUserComponent } from './Users/edit-user/edit-user.component';

import { ShopsListingComponent } from './Shops/shops-listing/shops-listing.component';
import { AddShopComponent } from './Shops/add-shop/add-shop.component';
import { EditShopComponent } from './Shops/edit-shop/edit-shop.component';

import { CategoryListingComponent } from './Categories/category-listing/category-listing.component';
import { AddCategoryComponent } from './Categories/add-category/add-category.component';
import { EditCategoryComponent } from './Categories/edit-category/edit-category.component';

import { FieldworkersListingComponent } from './Field-workers/fieldworkers-listing/fieldworkers-listing.component';
import { AddFieldworkerComponent } from './Field-workers/add-fieldworker/add-fieldworker.component';
import { EditFieldworkerComponent } from './Field-workers/edit-fieldworker/edit-fieldworker.component';

import { AdsListingComponent } from './Ads/ads-listing/ads-listing.component';
import { AddAdsComponent } from './Ads/add-ads/add-ads.component';
import { EditAdsComponent } from './Ads/edit-ads/edit-ads.component';

import { CitiesListingComponent } from './Cities/cities-listing/cities-listing.component';
import { AddCityComponent } from './Cities/add-city/add-city.component';

import { AllFeedbacksComponent } from './Feedbacks/all-feedbacks/all-feedbacks.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

    { path: 'dashboard', component: DashboardComponent, data: { title: marker('Dashboard') } },

    // user routes
    { path: 'users', component: UsersListingComponent, data: { title: marker('Users') } },
    { path: 'add-user', component: AddUserComponent, data: { title: marker('Add User') } },
    { path: 'edit-user/:id', component: EditUserComponent, data: { title: marker('Edit User') } },

    // shop routes
    { path: 'shops', component: ShopsListingComponent, data: { title: marker('Shops') } },
    { path: 'add-shop', component: AddShopComponent, data: { title: marker('Add Shop') } },
    { path: 'edit-shop/:id', component: EditShopComponent, data: { title: marker('Edit Shop') } },

    // category routes
    { path: 'categories', component: CategoryListingComponent, data: { title: marker('Categories') } },
    { path: 'add-category', component: AddCategoryComponent, data: { title: marker('Add Category') } },
    { path: 'edit-category/:id', component: EditCategoryComponent, data: { title: marker('Edit Category') } },

    // fieldworkers routes
    { path: 'fieldworkers', component: FieldworkersListingComponent, data: { title: marker('Field Workers') } },
    { path: 'add-fieldworker', component: AddFieldworkerComponent, data: { title: marker('Add Fieldworkers') } },
    { path: 'edit-fieldworker/:id', component: EditFieldworkerComponent, data: { title: marker('Edit Fieldworkers') } },

    // Ads routes
    { path: 'ads', component: AdsListingComponent, data: { title: marker('Ads') } },
    { path: 'add-ad', component: AddAdsComponent, data: { title: marker('Create Ad') } },
    { path: 'edit-ad/:id', component: EditAdsComponent, data: { title: marker('Edit Ad') } },

    // Cities routes
    { path: 'cities', component: CitiesListingComponent, data: { title: marker('Cities') } },
    { path: 'add-city', component: AddCityComponent, data: { title: marker('Create city') } },

    // Feedbacks
    { path: 'feedbacks', component: AllFeedbacksComponent, data: { title: marker('Feedbacks') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainComponentsRoutingModule {}
