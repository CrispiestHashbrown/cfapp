import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class IssuesServiceProvider {
 
  constructor(private http: HttpClient) {
  }

  getAssignedIssues(): Observable<HttpResponse<any>> {
    const url = `https://commitfrequency.firebaseapp.com/issues`;
    return this.http.get<any>(url, { 
      observe: 'response',
      withCredentials: true
    });
  }

}
