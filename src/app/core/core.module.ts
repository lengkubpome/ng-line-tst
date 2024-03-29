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
import { SharedModule } from '@shared/shared.module';
import { SideNavComponent } from './layout/side/side-nav.component';

const COMPONENTS = [HeaderComponent, FooterComponent, SideNavComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
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
