import { Component } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular';
import { Search } from '../../models/search/search.interface';
import { StarredServiceProvider } from '../../providers/starred/starred.service';

@IonicPage()
@Component({
  selector: 'page-starred',
  templateUrl: 'starred.html',
})
export class StarredPage {

  hideInfiniteScroll: boolean;
  linkHeader: string = '';
  starredResults: Search[] = [];

  constructor(
    private app: App,
    private alertCtrl: AlertController,
    private starredService: StarredServiceProvider,
    private inAppBrowser: InAppBrowser) {
  }

  ionViewDidEnter() {
    this.requestStarredRepositories();
  }

  requestStarredRepositories(infiniteScroll?) {
    if (!infiniteScroll) {
      this.hideInfiniteScroll = false;
      this.linkHeader = '';
      this.starredResults = [];
    }
    var ght = localStorage.getItem('ght');
    if (!ght) {
      this.showNoTokenAlert();
      this.app.getRootNav().setRoot('LoginPage');
    } else {
      this.starredService.getStarredRepos(ght)
        .subscribe(res => {
          if (res.headers.get('Link') != null) {
            this.linkHeader = res.headers.get('Link');
          } else {
            this.hideInfiniteScroll = true;
          }
          for (var repo of res.body) {
            this.starredResults.push(... [{
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
          this.showStarredAlert(err.message);
        });
    }
  }

  renderMoreResults(infiniteScroll) {
    var nextPage = this.nextPage(this.linkHeader);
    if (this.linkHeader.length < 1 || nextPage.length < 1) {
      this.hideInfiniteScroll = true;
    } else {
      this.hideInfiniteScroll = false;
      this.requestStarredRepositories(infiniteScroll);
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

  showNoTokenAlert() {
    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: `No token`,
      buttons: ['SORRY']
    });
    alert.present();
  }

  showStarredAlert(message: string) {
    const alert = this.alertCtrl.create({
      title: 'GitHub Error',
      subTitle: `Error fetching starred repositories: ${message}`,
      buttons: ['SORRY']
    });
    alert.present();
  }

}
