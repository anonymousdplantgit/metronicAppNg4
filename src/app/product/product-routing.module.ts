import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductManagementComponent } from './product-management/product-management.component';
const routes: Routes = [
  {path: 'product', component: ProductManagementComponent},
  {path: 'product/create', component: ProductManagementComponent},
  {path: 'product/edit/:id', component: ProductManagementComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
