import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeManagementComponent } from './type-management/type-management.component';

const routes: Routes = [
  {path: 'type', component: TypeManagementComponent},
  {path: 'type/create', component: TypeManagementComponent},
  {path: 'type/edit/:id', component: TypeManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeRoutingModule { }
