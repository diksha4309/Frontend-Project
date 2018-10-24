import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.authService.getToken();

    if (token) {
      headersConfig['Authorization'] = `Token ${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}