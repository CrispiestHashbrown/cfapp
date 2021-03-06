import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthPage } from './auth';
import { AuthServiceProvider } from '../../providers/auth/auth.service';

@NgModule({
  declarations: [
    AuthPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthPage),
  ],
  providers: [
    AuthServiceProvider
  ]
})
export class AuthPageModule {}
