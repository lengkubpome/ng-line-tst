import { ProductShowComponent } from './show/product-show.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent as ProductComponent } from './product.component';
import { ProductEditComponent } from './edit/product-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      { path: '', component: ProductShowComponent },
      { path: 'edit', component: ProductEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
