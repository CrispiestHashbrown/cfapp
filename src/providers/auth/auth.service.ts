import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthServiceProvider {

  constructor(private http: HttpClient) {
  }

  verifyToken(ght: string): Observable<HttpResponse<any>> {
    const url = `https://commitfrequency.firebaseapp.com/__/auth/verify`;
    return this.http.get(url, {
      headers: {
        'Authorization': `bearer ${ght}`
      },
      observe: 'response',
      responseType: 'text' as 'text'
    });
  }

}
