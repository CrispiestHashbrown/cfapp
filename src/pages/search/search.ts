import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular';
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
    private app: App,
    private navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private inAppBrowser: InAppBrowser,
    private searchService: SearchServiceProvider) {
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

    var ght = localStorage.getItem('ght');
    if (!ght) {
      this.showNoTokenAlert();
      this.app.getRootNav().setRoot('LoginPage');
    } else {
      this.searchService.searchForRepos(`${query}`, ght)
        .subscribe(res => {
          if (res.headers.get('Link') != null) {
            this.linkHeader = res.headers.get('Link');
          } else {
            this.hideInfiniteScroll = true;
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
        }, err => {
          this.showSearchAlert(err.message);
        });
    }
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

  showNoTokenAlert() {
    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: `No token`,
      buttons: ['SORRY']
    });
    alert.present();
  }

  showSearchAlert(message: string) {
    const alert = this.alertCtrl.create({
      title: 'GitHub Error',
      subTitle: `Error searching for GitHub results: ${message}`,
      buttons: ['SORRY']
    });
    alert.present();
  }

}
