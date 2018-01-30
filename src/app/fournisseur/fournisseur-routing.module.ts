import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FournisseurManagementComponent } from './fournisseur-management/fournisseur-management.component';

const routes: Routes = [
{path: 'fournisseur', component: FournisseurManagementComponent},
{path: 'fournisseur/create', component: FournisseurManagementComponent},
{path: 'fournisseur/edit/:id', component: FournisseurManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FournisseurRoutingModule { }
