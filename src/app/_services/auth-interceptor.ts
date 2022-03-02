import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    console.log('authToken' + authToken);
    const authreq = req.clone({
      setHeaders: {
        authorization: `Bearer ${authToken}`,
      },
      //   headers: req.headers.set('Authorization', 'Bearer ' + authToken),
    });
    console.log(authreq);
    return next.handle(authreq);
  }
}
