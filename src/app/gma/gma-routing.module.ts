import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorieManagementComponent } from './categorie-management/categorie-management.component';
import { FournisseurManagementComponent } from './fournisseur-management/fournisseur-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { ProjectTaskManagementComponent } from './project-task-management/project-task-management.component';
import { ResourceManagementComponent } from './resource-management/resource-management.component';
import { StateManagementComponent } from './state-management/state-management.component';
import { TypeManagementComponent } from './type-management/type-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'categorie', component: CategorieManagementComponent},
  {path: 'fournisseur', component: FournisseurManagementComponent},
  {path: 'product', component: ProductManagementComponent},
  {path: 'project', component: ProjectManagementComponent},
  {path: 'project/manage/:id', component: ProjectTaskManagementComponent},
  {path: 'resource', component: ResourceManagementComponent},
  {path: 'state', component: StateManagementComponent},
  {path: 'type', component: TypeManagementComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GmaRoutingModule { }
