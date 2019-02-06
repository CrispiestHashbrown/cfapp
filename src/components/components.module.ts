import { NgModule } from "@angular/core";
import { IonicModule } from 'ionic-angular';
import { CommitGraphComponent } from './commit-graph/commit-graph';
import { CommitCountServiceProvider } from '../providers/commit-count/commit-count.service';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    CommitGraphComponent,
  ],
  imports: [
    IonicModule,
    ChartsModule
  ],
  exports: [
    CommitGraphComponent,
  ],
  providers: [
    CommitCountServiceProvider
  ]
})
export class ComponentsModule {

}

