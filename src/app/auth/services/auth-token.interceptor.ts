import { getToken } from './../state/auth.selectors';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { exhaustMap, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../state';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<AuthState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(getToken).pipe(
      exhaustMap((token) => {
        if (!token) {
          return next.handle(req);
        }
        let modifiedReq = req.clone({
          params: req.params.append('auth', token),
        });
        return next.handle(modifiedReq);
      })
    );
    return next.handle(req);
  }
}
