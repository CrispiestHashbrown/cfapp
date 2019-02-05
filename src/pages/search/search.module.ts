import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import { SearchServiceProvider } from '../../providers/search/search.service';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
  ],
  providers: [
    SearchServiceProvider
  ]
})
export class SearchPageModule {}
