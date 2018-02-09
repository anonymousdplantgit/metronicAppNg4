import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductManagementComponent } from './product-management/product-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule  } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ToastrModule.forRoot({timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,}), // ToastrModule added
  ],
  declarations: [ProductManagementComponent]
})
export class ProductModule { }
