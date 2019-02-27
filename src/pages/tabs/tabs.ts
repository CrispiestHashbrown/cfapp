import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: string;
  tab2Root: string;
  tab3Root: string;
  tab4Root: string;

  constructor() {
    this.tab1Root = 'SearchPage';
    this.tab2Root = 'StarredPage';
    this.tab3Root = 'IssuesPage';
    this.tab4Root = 'LogoutPage';
  }

}
