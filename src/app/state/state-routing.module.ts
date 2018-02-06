import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateManagementComponent } from './state-management/state-management.component';

const routes: Routes = [
  {path: 'state', component: StateManagementComponent},
  {path: 'state/create', component: StateManagementComponent},
  {path: 'state/edit/:id', component: StateManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule { }
