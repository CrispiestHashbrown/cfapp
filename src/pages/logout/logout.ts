import { Component } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LogoutServiceProvider } from '../../providers/logout/logout.service';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  url: string = 'https://github.com/settings/connections/applications/11ef443ae956d0e2bb73';

  constructor(
    private app: App,
    public alertCtrl: AlertController,
    private inAppBrowser: InAppBrowser, 
    private logoutService: LogoutServiceProvider) {
  }

  logout() {
    var ght = localStorage.getItem('ght');
    if (!ght) {
      this.showNoTokenAlert();
      this.app.getRootNav().setRoot('LoginPage');
    } else {
      this.logoutService.revokeTokenAccess(ght)
        .subscribe(res => {
          if (res.status === 204) {
            localStorage.removeItem('ght');
            this.app.getRootNav().setRoot('AuthPage');
          }
        }, err => {
          console.log(`Error while revoking token grants: ${err}`);
          this.showRevokeErrorAlert(err.message);
        });
    }
  }

  showRevokeErrorAlert(message: any) {
    const alert = this.alertCtrl.create({
      title: 'GitHub Error',
      subTitle: `Error while revoking token grants via GitHub: ${message}`,
      buttons: ['SORRY']
    });
    alert.present();
  }

  showNoTokenAlert() {
    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: `No token`,
      buttons: ['SORRY']
    });
    alert.present();
  }

  navigateToGitHub(url: string) {
    this.inAppBrowser.create(url, '_blank', 'clearsessioncache=no');
  }

}
