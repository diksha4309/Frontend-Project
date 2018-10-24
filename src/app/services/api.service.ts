import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://conduit.productionready.io/api';
  constructor(private http:HttpClient){ }

  get(path: string, params: HttpParams = new HttpParams()):Observable<any>{
    return this.http.get(`${this.url}${path}`, { params });
  }

  post(path: string, body):Observable<any>{
    return this.http.post(
      `${this.url}${path}`, body
    );
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.url}${path}`
    );
  }

  put(path:string, body: Object = {}):Observable<any>{
    return this.http.put(`${this.url}${path}`, body);
  }
}
