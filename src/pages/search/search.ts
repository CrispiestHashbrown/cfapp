import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Search } from '../../models/search/search.interface';
import { SearchServiceProvider } from '../../providers/search/search.service';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchQuery: string;
  resultsCount: number;
  linkHeader: string = '';
  searchResults: Search[] = [];

  constructor(
    private searchService: SearchServiceProvider,
    private inAppBrowser: InAppBrowser) {}

  requestSearch(query: string, infiniteScroll?) {
    if (!infiniteScroll) {
      this.linkHeader = '';
      this.searchResults = [];
    }
    this.searchService.searchForRepos(`${query}`)
      .subscribe(res => {
        if (res.headers.get('Link') != null) {
          this.linkHeader = res.headers.get('Link');
        }
        this.resultsCount = res.body.total_count;
        for (var repo of res.body.items) {
          this.searchResults.push(... [{
            "fullName": repo.full_name,
            "url": repo.html_url, 
            "stars": repo.stargazers_count, 
            "description": repo.description, 
            "language": repo.language,
            "score": repo.score
          }]);
        }
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

  navigateToGitHub(url: string) {
    this.inAppBrowser.create(url, '_blank', 'clearsessioncache=no');
  }

}
