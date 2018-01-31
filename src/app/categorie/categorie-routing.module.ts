import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorieManagementComponent } from './categorie-management/categorie-management.component';

const routes: Routes = [
  {path: 'categorie', component: CategorieManagementComponent},
  {path: 'categorie/create', component: CategorieManagementComponent},
  {path: 'categorie/edit/:id', component: CategorieManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorieRoutingModule { }
