import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManagementComponent } from './components/management/product-management.component';
import { ProductViewComponent } from './components/view/product-view.component';
import { ProductComponent as ProductComponent } from './containers/product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      { path: '', component: ProductViewComponent },
      { path: 'edit', component: ProductManagementComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
