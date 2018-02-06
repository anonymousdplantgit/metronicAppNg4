import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourceManagementComponent } from './resource-management/resource-management.component';

const routes: Routes = [
  {path: 'resource', component: ResourceManagementComponent},
  {path: 'resource/create', component: ResourceManagementComponent},
  {path: 'resource/edit/:id', component: ResourceManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceRoutingModule { }
