import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialsModule } from '@shared/ui/material';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './containers/product.component';
import { ProductEditDiaglogComponent } from './components/edit-dialog/product-edit-diaglog.component';
import { ProductManagementComponent } from './components/management/product-management.component';
import { ProductViewComponent } from './components/view/product-view.component';
import { StoreModule } from '@ngrx/store';
import * as fromProduct from './state/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product.effects';
import { ProductAddDialogComponent } from './components/add-dialog/product-add-dialog.component';
import { ProductDeleteDialogComponent } from './components/delete-dialog/product-delete-dialog.component';

const Components = [
  ProductComponent,
  ProductEditDiaglogComponent,
  ProductAddDialogComponent,
  ProductDeleteDialogComponent,
  ProductManagementComponent,
  ProductViewComponent,
];

@NgModule({
  declarations: [...Components],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialsModule,
    StoreModule.forFeature(
      fromProduct.productFeatureKey,
      fromProduct.productReducer
    ),
    EffectsModule.forFeature([ProductEffects]),
  ],
  providers: [DatePipe],
})
export class ProductModule {}
