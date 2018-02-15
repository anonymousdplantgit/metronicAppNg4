
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule  } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GmaRoutingModule } from './gma-routing.module';
import { FournisseurManagementComponent } from './fournisseur-management/fournisseur-management.component';
import { CategorieManagementComponent } from './categorie-management/categorie-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { ProjectTaskManagementComponent } from './project-task-management/project-task-management.component';
import { ResourceManagementComponent } from './resource-management/resource-management.component';
import { StateManagementComponent } from './state-management/state-management.component';
import { TypeManagementComponent } from './type-management/type-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DateValueAccessorModule } from 'angular-date-value-accessor';

@NgModule({
  imports: [
    CommonModule,
    GmaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DateValueAccessorModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ToastrModule.forRoot({timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      closeButton:true,
      progressBar:true}),
    BrowserModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    DashboardComponent,
    CategorieManagementComponent,
    FournisseurManagementComponent,
    ProductManagementComponent,
    ProjectTaskManagementComponent,
    ProjectManagementComponent,
    ResourceManagementComponent,
    StateManagementComponent,
    TypeManagementComponent]
})
export class GmaModule { }
