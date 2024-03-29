import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TUI_SANITIZER,
  TUI_ICONS_PATH,
  tuiIconsPathFactory,
  TuiDialogModule,
  TuiAlertModule,
  TuiRootModule,
} from '@taiga-ui/core';
import { CoreEffects } from './core/state/core.effects';
import { CoreModule } from '@core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ROOT_REDUCERS, metaReducers } from './app.reducer';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SharedModule } from '@shared/shared.module';
import { SharedEffects } from '@shared/state';
import * as fromAuth from './auth/state';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './features/home/home.component';
import { TaigaModule } from '@shared/ui';
// import { AuthTokenInterceptor } from './auth/services/auth-token.interceptor';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(ROOT_REDUCERS, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([CoreEffects, SharedEffects, fromAuth.AuthEffects]),
    StoreRouterConnectingModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    TuiRootModule,
    TuiAlertModule,
    TuiDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
