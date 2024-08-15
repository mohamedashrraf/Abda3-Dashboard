import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = JSON.parse(localStorage.getItem('authToken')!) ?.token as string;

      console.log('Intercepted HTTP call', req);

  if (token && !token.startsWith('Bearer ')) {
    token = `Bearer ${token}`;
    }

    if (token) {
      console.log(token);
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json',
          'Accept-Language': 'ar',
          'App-Version': '11',
          'Device-Name': 'chrome',
          'Device-OS-Version': '13',
          'Device-UDID': '1234',
          'Device-Push-Token': '123456',
          'Device-Type': 'web',
        }
      });
    console.log('Request with Authorization header:', clonedRequest); 

      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }
}
