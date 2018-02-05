import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FournisseurRoutingModule } from './fournisseur-routing.module';
import { FournisseurManagementComponent } from './fournisseur-management/fournisseur-management.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule  } from 'ngx-toastr';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FournisseurRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ToastrModule.forRoot({timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,}), // ToastrModule added
     ],
  declarations: [FournisseurManagementComponent]
})
export class FournisseurModule {
  constructor(public translate: TranslateService) { }
 }


