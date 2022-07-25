import { ProductShowComponent } from './show/product-show.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { MaterialsModule } from '@shared/modules/materials.module';
import { ProductEditComponent } from './edit/product-edit.component';
import { ProductEditDiaglogComponent } from './edit/diaglog/product-edit-diaglog.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductShowComponent,
    ProductEditComponent,
    ProductEditDiaglogComponent,
  ],
  imports: [CommonModule, ProductRoutingModule, MaterialsModule],
  providers: [DatePipe],
})
export class ProductModule {}
