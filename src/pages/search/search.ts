import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { SearchServiceProvider } from '../../providers/search/search.service';
import { KeyValue } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchQuery: string;
  firstPage: number = 1;
  pageNumber: number;
  resultsCount: number;
  linkHeader: string;
  searchResults: any = [];

  constructor(private searchService: SearchServiceProvider) {
  }

  requestSearch(query: string, page?: number, infiniteScroll?) {
    if (page) {
      this.pageNumber = page;
      this.searchResults = [];
    }
    this.searchService.requestSearchRepos(`${query}&page=${this.pageNumber}`)
      .subscribe(res => {
        this.resultsCount = res.body.total_count;
        this.linkHeader = res.headers.get('Link');
        this.searchResults.push(... res.body.items);
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      });
  }

  renderMoreResults(query:string, infiniteScroll) {
    if (this.isAnotherPage()) {
      this.requestSearch(query, undefined, infiniteScroll);
    } else {
      infiniteScroll.enable(false);
    }
  }
  
  isAnotherPage() {
    const doesNextLinkExist = this.linkHeader.includes(`; rel="next",`);
    if (doesNextLinkExist) {
      this.pageNumber++;
      return true;
    }
    return false;
  }

  keyDescValueOrder = (a: KeyValue<number,any>, b: KeyValue<number,any>): number => {
    return Math.min(a.key, b.key);
  }

}
