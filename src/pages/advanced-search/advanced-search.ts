import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-advanced-search',
  templateUrl: 'advanced-search.html',
})
export class AdvancedSearchPage {

  fullQuery: string = '';
  searchQuery: string = '';

  queryArray: string[] = [
    'org',
    'stars',
    'language',
    'good-first-issues',
    'help-wanted-issues'
  ]

  inputArray: string[] = [
    '',
    '',
    '',
    '',
    ''
  ]

  languageArray: string[] = [
    'Any',
    'C',
    'C#',
    'C++',
    'Clojure',
    'CSS',
    'Go',
    'Haskell',
    'HTML',
    'Java',
    'JavaScript',
    'Lua',
    'MATLAB',
    'Objective-C',
    'Perl',
    'PHP',
    'Python',
    'R',
    'Ruby',
    'Scala',
    'Shell',
    'Swift',
    'TypeScript',
    'Vue'
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let searchQuery = window.localStorage.getItem('searchQuery');
    if (searchQuery != null) {
      this.searchQuery = searchQuery;
    }

    for (var i = 0; i < 5; i++) {
      let queryVariable = window.localStorage.getItem(this.queryArray[i]);
      if (queryVariable != null) {
        this.inputArray[i] = queryVariable;
      }
    }
  }

  forwardSearchQuery() {
    this.formSearchQuery();
    this.saveInputsToLocalStorage();
    this.navCtrl.push('SearchPage', {
      fullQuery: this.fullQuery
    });
  }

  formSearchQuery() {
    this.fullQuery = this.searchQuery;
    for (var i = 0; i < 5; i++) {
      if (this.inputArray[i].length > 0 && this.inputArray[i] != 'Any') {
        this.fullQuery += ` ${this.queryArray[i]}:${this.inputArray[i]}`;
      }
    }
  }

  saveInputsToLocalStorage() {
    let searchQuery = this.searchQuery;
    if (searchQuery != null) {
      window.localStorage.setItem('searchQuery', searchQuery);
    }

    for (var i = 0; i < 5; i++) {
      let input = this.inputArray[i];
      if (input != null) {
        window.localStorage.setItem(this.queryArray[i], input);
      }
    }
  }

}
