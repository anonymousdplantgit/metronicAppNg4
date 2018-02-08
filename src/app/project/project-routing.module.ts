import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { ProjectTaskManagementComponent } from './project-task-management/project-task-management.component';

const routes: Routes = [
  {path: 'project', component: ProjectManagementComponent},
  {path: 'project/manage/:id', component: ProjectTaskManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
