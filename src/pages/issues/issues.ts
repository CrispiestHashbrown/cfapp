import { Component } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular';
import { Issues } from '../../models/issues/issues.interface';
import { IssuesServiceProvider } from '../../providers/issues/issues.service';

@IonicPage()
@Component({
  selector: 'page-issues',
  templateUrl: 'issues.html',
})
export class IssuesPage {

  hideInfiniteScroll: boolean;
  linkHeader: string = '';
  issuesResults: Issues[] = [];

  constructor(
    private app: App,
    private alertCtrl: AlertController,
    private issuesService: IssuesServiceProvider,
    private inAppBrowser: InAppBrowser) {
  }

  ionViewDidEnter() {
    this.requestIssues();
  }

  requestIssues(infiniteScroll?) {
    if (!infiniteScroll) {
      this.hideInfiniteScroll = false;
      this.linkHeader = '';
      this.issuesResults = [];
    }
    var ght = localStorage.getItem('ght');
    if (!ght) {
      this.showNoTokenAlert();
      this.app.getRootNav().setRoot('LoginPage');
    } else {
      this.issuesService.getAssignedIssues(ght)
        .subscribe(res => {
          if (res.headers.get('Link') != null) {
            this.linkHeader = res.headers.get('Link');
          } else {
            this.hideInfiniteScroll = true;
          }
          for (var issue of res.body) {
            this.issuesResults.push(... [{
              "title": issue.title,
              "number": issue.number,
              "url": issue.html_url,
              "repository": issue.repository.full_name
            }]);
          }
          if (infiniteScroll) {
            infiniteScroll.complete();
          }
        }, err => {
          this.showIssuesAlert(err.message);
        });
    }
  }

  renderMoreResults(infiniteScroll) {
    var nextPage = this.nextPage(this.linkHeader);
    if (this.linkHeader.length < 1 || nextPage.length < 1) {
      this.hideInfiniteScroll = true;
    } else {
      this.hideInfiniteScroll = false;
      this.requestIssues(infiniteScroll);
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

  showIssuesAlert(message: string) {
    const alert = this.alertCtrl.create({
      title: 'GitHub Error',
      subTitle: `Error fetching assigned issues: ${message}`,
      buttons: ['SORRY']
    });
    alert.present();
  }

}
