import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LogoutServiceProvider {

  constructor(private http: HttpClient) {
  }

  revokeTokenAccess(): Observable<HttpResponse<any>> {
    const url = `https://commitfrequency.firebaseapp.com/__/auth/grants`;
    return this.http.delete<any>(url, { observe: 'response' });
  }

}
