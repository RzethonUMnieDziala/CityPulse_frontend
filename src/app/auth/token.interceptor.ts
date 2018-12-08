import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService, User } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private scAuth: AuthService) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.startsWith(this.scAuth.steemconnectURL)) {
      return this.scAuth.authState.pipe(
        switchMap((user: User) => {
          const tokenHeader = 'Bearer ' + user.token.access_token;
          const newRequest = request.clone({
            headers: request.headers.set('Authorization', tokenHeader)
          });
          return next.handle(newRequest);
        })
      );
    }

    return next.handle(request);
  }
}
