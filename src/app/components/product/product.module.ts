import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialsModule } from '@shared/ui/material';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './containers/product.component';
import { ProductEditDiaglogComponent } from './components/edit-diaglog/product-edit-diaglog.component';
import { ProductEditComponent } from './components/edit/product-edit.component';
import { ProductViewComponent } from './components/view/product-view.component';

const Components = [
  ProductComponent,
  ProductEditDiaglogComponent,
  ProductEditComponent,
  ProductViewComponent,
];

@NgModule({
  declarations: [...Components],
  imports: [CommonModule, ProductRoutingModule, MaterialsModule],
  providers: [DatePipe],
})
export class ProductModule {}
