import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class StarredServiceProvider {

  constructor(private http: HttpClient) {
  }

  getStarredRepos(ght: string): Observable<HttpResponse<any>> {
    const url = `https://commitfrequency.firebaseapp.com/user/starred`;
    return this.http.get<any>(url, {
      headers: {
        'Authorization': `bearer ${ght}`
      },
      observe: 'response'
    });
  }

  starRepo(fullName: string, ght: string): Observable<HttpResponse<any>> {
    const url = `https://commitfrequency.firebaseapp.com/user/starred/${fullName}/?ght=${ght}`;
    return this.http.put<any>(url, {
      observe: 'response'
    });
  }

  unstarRepo(fullName: string, ght: string): Observable<HttpResponse<any>> {
    const url = `https://commitfrequency.firebaseapp.com/user/starred/${fullName}`;
    return this.http.delete(url, {
      headers: {
        'Authorization': `bearer ${ght}`
      },
      observe: 'response',
      responseType: 'text' as 'text'
    });
  }

}
