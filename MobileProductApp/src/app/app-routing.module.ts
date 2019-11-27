import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


const routes: Routes = [
  {path : '', component : ProductsHomeComponent},
  {path : 'edit-product/:prodName', component: ProductDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
