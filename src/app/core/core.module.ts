import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialsModule } from '@shared/ui';
import { StoreModule } from '@ngrx/store';
import * as fromCore from './state/core.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoreEffects } from './state/core.effects';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

const COMPONENTS = [HeaderComponent, FooterComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialsModule,
    RouterModule,
    // StoreModule.forFeature(fromCore.coreFeatureKey, fromCore.coreReducer),
    // EffectsModule.forFeature([CoreEffects]),
  ],
  exports: [...COMPONENTS, RouterModule, CommonModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
