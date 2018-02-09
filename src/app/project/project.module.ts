import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule  } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectTaskManagementComponent } from './project-task-management/project-task-management.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectRoutingModule,
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
  declarations: [ProjectManagementComponent, ProjectTaskManagementComponent]
})
export class ProjectModule { }
