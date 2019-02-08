import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogoutPage } from './logout';
import { LogoutServiceProvider } from '../../providers/logout/logout.service';

@NgModule({
  declarations: [
    LogoutPage,
  ],
  imports: [
    IonicPageModule.forChild(LogoutPage),
  ],
  providers: [
    LogoutServiceProvider
  ]
})
export class LogoutPageModule {}
