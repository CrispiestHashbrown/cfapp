import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth/auth.service';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  constructor(private app: App, private navCtrl: NavController, private authService: AuthServiceProvider) {
  }

  ngOnInit() {
    var ght = localStorage.getItem('ght');
    if (!ght) {
      this.app.getRootNav().setRoot('LoginPage');
    } else {
      this.authService.verifyToken(ght)
      .subscribe(res => {
        this.navCtrl.setRoot('TabsPage');
      }, err => {
        this.app.getRootNav().setRoot('LoginPage');
      });
    }
  }

}
