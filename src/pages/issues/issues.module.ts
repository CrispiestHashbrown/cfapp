import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IssuesPage } from './issues';
import { IssuesServiceProvider } from '../../providers/issues/issues.service';

@NgModule({
  declarations: [
    IssuesPage,
  ],
  imports: [
    IonicPageModule.forChild(IssuesPage),
  ],
  providers: [
    IssuesServiceProvider
  ]
})
export class IssuesPageModule {}
