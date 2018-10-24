import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://conduit.productionready.io/api';
  constructor(private http: HttpClient) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body): Observable<any> {
    return this.http.post(
      `${this.url}${path}`, body
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.url}${path}`
    ).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${this.url}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }
}
