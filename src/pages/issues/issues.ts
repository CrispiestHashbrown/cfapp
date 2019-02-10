import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Issues } from '../../models/issues/issues.interface';
import { IssuesServiceProvider } from '../../providers/issues/issues.service';

@IonicPage()
@Component({
  selector: 'page-issues',
  templateUrl: 'issues.html',
})
export class IssuesPage {

  resultsCount: number;
  hideInfiniteScroll: boolean;
  linkHeader: string = '';
  issuesResults: Issues[] = [];

  constructor(private issuesService: IssuesServiceProvider, private inAppBrowser: InAppBrowser) {
  }

  ionViewWillEnter() {
    this.requestIssues();
  }

  requestIssues(infiniteScroll?) {
    if (!infiniteScroll) {
      this.hideInfiniteScroll = false;
      this.linkHeader = '';
      this.issuesResults = [];
    }
    this.issuesService.getAssignedIssues()
      .subscribe(res => {
        if (res.headers.get('Link') != null) {
          this.linkHeader = res.headers.get('Link');
        }
        this.resultsCount = res.body.total_count;
        for (var issue of res.body.items) {
          this.issuesResults.push(... [{
            "title": issue.title,
            "number": issue.number,
            "url": issue.url,
            "repository": issue.repository.full_name
          }]);
        }
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      }, err => {
        console.log(`Error while getting starred repos: ${err}`);
      });
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

}
