import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StarredPage } from './starred';
import { ComponentsModule } from '../../components/components.module'
import { StarredServiceProvider } from '../../providers/starred/starred.service';

@NgModule({
  declarations: [
    StarredPage,
  ],
  imports: [
    IonicPageModule.forChild(StarredPage),
    ComponentsModule
  ],
  providers: [
    StarredServiceProvider
  ]
})
export class StarredPageModule {}
