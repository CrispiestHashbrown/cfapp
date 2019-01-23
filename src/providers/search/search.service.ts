import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class SearchServiceProvider {

  constructor(private http: HttpClient) {
  }

  requestSearchRepos(query: string): Observable<HttpResponse<any>> {

    const url = `https://commitfrequency.firebaseapp.com/search/repositories?q=${query}`;
    return this.http.get<any>(url, { observe: 'response' }).pipe(delay(2500));
  }

}
