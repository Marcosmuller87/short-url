import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ShortInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const TOKEN = '6d30c19a13d41f38a9f8faa68c7109c15df33345';

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return next.handle(request);
  }
}
