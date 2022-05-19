import { Injectable } from '@angular/core';
import { Observable, of, from, forkJoin } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, catchError, mergeMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  grabText(url): Observable<any> {
    return this.http.get<any>(url);
  }
}
