import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  hideInfiniteScroll: boolean;
  linkHeader: string = '';
  searchResults: Search[] = [];

  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    private searchService: SearchServiceProvider,
    private inAppBrowser: InAppBrowser) {
      if (navParams.get('fullQuery')) {
        this.searchQuery = navParams.get('fullQuery');
        this.requestSearch(this.searchQuery);
      }
    }

  requestSearch(query: string, infiniteScroll?) {
    if (!infiniteScroll) {
      this.hideInfiniteScroll = false;
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
            "score": repo.score,
            "shouldPresentGraph": false
          }]);
        }
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      },
      err => {
        console.log(`Error while searching for repos: ${err}`);
      });
  }

  renderMoreResults(infiniteScroll) {
    var nextPage = this.nextPage(this.linkHeader);
    if (this.linkHeader.length < 1 || nextPage.length < 1) {
      this.hideInfiniteScroll = true;
    } else {
      this.hideInfiniteScroll = false;
      this.requestSearch(nextPage, infiniteScroll);
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

  navigateToAdvancedSearchPage() {
    this.navCtrl.push('AdvancedSearchPage');
  }

}
