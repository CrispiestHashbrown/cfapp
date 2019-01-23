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
  resultsCount: number;
  linkHeader: string = '';
  searchResults: any = [];

  constructor(private searchService: SearchServiceProvider) {
  }

  requestSearch(query: string, infiniteScroll?) {
    if (!infiniteScroll) {
      this.linkHeader = '';
      this.searchResults = [];
    }
    this.searchService.requestSearchRepos(`${query}`)
      .subscribe(res => {
        if (res.headers.get('Link') != null) {
          this.linkHeader = res.headers.get('Link');
        }
        this.resultsCount = res.body.total_count;
        this.searchResults.push(... res.body.items);
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      });
  }

  renderMoreResults(infiniteScroll) {
    if (this.linkHeader.length > 0) {
      this.requestSearch(this.nextPage(this.linkHeader), infiniteScroll);
    } else {
      infiniteScroll.enable(false);
    }
  }

  nextPage(headerString: string) {
    var nextLink: string = '';
    const doesNextLinkExist = headerString.includes(`>; rel="next",`);
    if (doesNextLinkExist) {
      var split = headerString.split(', <');
      nextLink = split.find(function (element) {
        return element.includes(`>; rel="next"`);
      });
      nextLink = nextLink.substring(nextLink.indexOf(`q=`)+2, nextLink.indexOf(`>; rel="next"`));
    }
    return nextLink;
  }

  keyDescValueOrder = (a: KeyValue<number,any>, b: KeyValue<number,any>): number => {
    return Math.min(a.key, b.key);
  }

}
