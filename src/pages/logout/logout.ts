import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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
    private navCtrl: NavController, 
    public alertCtrl: AlertController,
    private inAppBrowser: InAppBrowser, 
    private logoutService: LogoutServiceProvider) {
  }

  logout() {
    this.logoutService.revokeTokenAccess()
      .subscribe(res => {
        if (res.status === 204) {
          this.navCtrl.setRoot('AuthPage');
        }
      }, err => {
        console.log(`Error while revoking token grants: ${err}`);
        this.showAlert(err.message);
      });
  }

  showAlert(message: any) {
    const alert = this.alertCtrl.create({
      title: 'GitHub Error',
      subTitle: `Error while revoking token grants via GitHub: ${message}`,
      buttons: ['SORRY']
    });
    alert.present();
  }

  navigateToGitHub(url: string) {
    this.inAppBrowser.create(url, '_blank', 'clearsessioncache=no');
  }

}
