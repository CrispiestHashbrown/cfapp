import { NgModule } from "@angular/core";
import { IonicModule } from 'ionic-angular';
import { CommitGraphComponent } from './commit-graph/commit-graph';
import { CommitCountServiceProvider } from '../providers/commit-count/commit-count.service';
import { ChartsModule } from 'ng2-charts';
import { StarRepoButtonComponent } from './star-repo-button/star-repo-button.component';
import { StarredServiceProvider } from '../providers/starred/starred.service';

@NgModule({
  declarations: [
    CommitGraphComponent,
    StarRepoButtonComponent
  ],
  imports: [
    IonicModule,
    ChartsModule
  ],
  exports: [
    CommitGraphComponent,
    StarRepoButtonComponent
  ],
  providers: [
    CommitCountServiceProvider,
    StarredServiceProvider
  ]
})
export class ComponentsModule {

}

