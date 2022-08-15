import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialsModule } from '@shared/ui/material';
import { StoreModule } from '@ngrx/store';
import * as fromCore from './state/core.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoreEffects } from './state/core.effects';

const COMPONENTS = [HeaderComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialsModule,
    StoreModule.forFeature(fromCore.coreFeatureKey, fromCore.coreReducer),
    EffectsModule.forFeature([CoreEffects]),
  ],
  exports: [...COMPONENTS],
})
export class CoreModule {}
