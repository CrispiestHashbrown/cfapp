import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmitTokenPage } from './submit-token';
import { AuthServiceProvider } from '../../providers/auth/auth.service';

@NgModule({
  declarations: [
    SubmitTokenPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmitTokenPage),
  ],
  providers: [
    AuthServiceProvider
  ]
})
export class SubmitTokenPageModule {}
