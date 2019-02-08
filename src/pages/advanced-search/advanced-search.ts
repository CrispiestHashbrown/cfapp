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
    'org:',
    'stars:',
    'language:',
    'good-first-issues:',
    'help-wanted-issues:'
  ]

  inputArray: string[] = [
    '',
    '',
    '',
    '',
    ''
  ]

  languageArray: string[] = [
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
    this.searchQuery = window.localStorage.getItem('searchQuery');
    this.inputArray[0] = window.localStorage.getItem('orgInput');
    this.inputArray[1] = window.localStorage.getItem('starsInput');
    this.inputArray[2] = window.localStorage.getItem('languageInput');
    this.inputArray[3] = window.localStorage.getItem('goodFirstIssuesInput');
    this.inputArray[4] = window.localStorage.getItem('helpWantedLabelsInput');
  }

  forwardSearchQuery() {
    this.formSearchQuery();
    this.saveInputsToLocalStorage();
    console.log(this.fullQuery);
    this.navCtrl.push('SearchPage', {
      fullQuery: this.fullQuery
    });
  }

  formSearchQuery() {
    this.fullQuery = this.searchQuery;
    for (var i = 0; i < 5; i++) {
      if (this.inputArray[i].length > 0) {
        this.queryArray[i] += this.inputArray[i];
        this.fullQuery += ` ${this.queryArray[i]}`;
      }
    }
  }

  saveInputsToLocalStorage() {
    window.localStorage.setItem('searchQuery', this.searchQuery);
    window.localStorage.setItem('orgInput', this.inputArray[0]);
    window.localStorage.setItem('starsInput', this.inputArray[1]);
    window.localStorage.setItem('languageInput', this.inputArray[2]);
    window.localStorage.setItem('goodFirstIssuesInput', this.inputArray[3]);
    window.localStorage.setItem('helpWantedLabelsInput', this.inputArray[4]);
  }

}
