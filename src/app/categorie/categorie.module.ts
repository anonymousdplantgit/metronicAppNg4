import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorieManagementComponent } from './categorie-management/categorie-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { CategorieRoutingModule } from './categorie-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule  } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CategorieRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ToastrModule.forRoot({timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,}), // ToastrModule added
    BrowserModule,
    BrowserAnimationsModule,
    
  ],
  declarations: [CategorieManagementComponent]
})
export class CategorieModule { }
