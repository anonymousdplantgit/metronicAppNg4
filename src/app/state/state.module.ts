import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateRoutingModule } from './state-routing.module';
import { StateManagementComponent } from './state-management/state-management.component';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule  } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
@NgModule({
  imports: [
    CommonModule,
    StateRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ToastrModule.forRoot({timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      closeButton:true,
    progressBar:true}), // ToastrModule added
    BrowserModule,
    BrowserAnimationsModule,
  ],
  declarations: [StateManagementComponent]
})
export class StateModule { }
