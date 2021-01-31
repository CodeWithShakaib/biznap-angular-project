import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponentsRoutingModule } from './main-components-routing.module';
import { AddUserComponent } from './Users/add-user/add-user.component';
import { UsersListingComponent } from './Users/users-listing/users-listing.component';
import { MaterialModule } from './../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ShopsListingComponent } from './Shops/shops-listing/shops-listing.component';
import { AddShopComponent } from './Shops/add-shop/add-shop.component';
import { CategoryListingComponent } from './Categories/category-listing/category-listing.component';
import { AddCategoryComponent } from './Categories/add-category/add-category.component';
import { EditCategoryComponent } from './Categories/edit-category/edit-category.component';
import { EditShopComponent } from './Shops/edit-shop/edit-shop.component';
import { FieldworkersListingComponent } from './Field-workers/fieldworkers-listing/fieldworkers-listing.component';
import { AddFieldworkerComponent } from './Field-workers/add-fieldworker/add-fieldworker.component';
import { EditFieldworkerComponent } from './Field-workers/edit-fieldworker/edit-fieldworker.component';
import { EditUserComponent } from './Users/edit-user/edit-user.component';
import { SharedModule } from '@app/@shared';
import { AdsListingComponent } from './Ads/ads-listing/ads-listing.component';
import { AddAdsComponent } from './Ads/add-ads/add-ads.component';
import { EditAdsComponent } from './Ads/edit-ads/edit-ads.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AddCityComponent } from './Cities/add-city/add-city.component';
import { CitiesListingComponent } from './Cities/cities-listing/cities-listing.component';
import { AllFeedbacksComponent } from './Feedbacks/all-feedbacks/all-feedbacks.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AddUserComponent,
    UsersListingComponent,
    ShopsListingComponent,
    AddShopComponent,
    CategoryListingComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    EditShopComponent,
    FieldworkersListingComponent,
    AddFieldworkerComponent,
    EditFieldworkerComponent,
    EditUserComponent,
    AdsListingComponent,
    AddAdsComponent,
    EditAdsComponent,
    DashboardComponent,
    AddCityComponent,
    CitiesListingComponent,
    AllFeedbacksComponent,
  ],
  imports: [
    CommonModule,
    MainComponentsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxChartsModule,
    NgbModule,
  ],
})
export class MainComponentsModule {}
