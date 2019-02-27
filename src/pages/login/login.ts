import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(
    private navCtrl: NavController, 
    private inAppBrowser: InAppBrowser,
    private alertCtrl: AlertController) {
  }

  isGranted: boolean = false;
  private scopeQueryString: string;

  goToSubmitTokenPage() {
    this.navCtrl.push('SubmitTokenPage');
  }

  loginToGitHub() {
    if (this.isGranted) {
      this.scopeQueryString = '?scope=public_repo,read:user,user:follow';
    }

    const url = `https://commitfrequency.firebaseapp.com/__/auth/${this.scopeQueryString}`;
    const browser = this.inAppBrowser.create(url, '_blank', 'hardwareback=no,hidenavigationbuttons=yes,clearsessioncache=no,clearcache=no');
    browser.on('loaderror').subscribe((event: InAppBrowserEvent) => {
      this.showAlert(event.message);
    })
  }

  showAlert(message: any) {
    const alert = this.alertCtrl.create({
      title: 'InAppBrowser Error',
      subTitle: `Error starting InAppBrowser: ${message}`,
      buttons: ['SORRY']
    });
    alert.present();
  }

}
