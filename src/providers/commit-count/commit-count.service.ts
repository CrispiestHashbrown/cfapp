import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CommitCountServiceProvider {

  constructor(private http: HttpClient) {
  }

  getRepoCommitCount(fullName: string, ght: string): Observable<HttpResponse<any>> {
    const url = `https://commitfrequency.firebaseapp.com/repocommitcount/${fullName}`;
    return this.http.get<any>(url, {
      headers: {
        'Authorization': `bearer ${ght}`
      },
      observe: 'response'
    });
  }

}
