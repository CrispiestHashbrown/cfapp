import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(private navCtrl: NavController, private inAppBrowser: InAppBrowser) {}

  isGranted: boolean = false;
  private scopeQueryString: string;

  navigateToPage() {
    if (this.isGranted) {
      this.scopeQueryString = '?scope=public_repo,read:user,user:follow';
    }

    const url = `https://commitfrequency.firebaseapp.com/__/auth/${this.scopeQueryString}`;
    const browser = this.inAppBrowser.create(url, '_blank', 'hardwareback=no,hidenavigationbuttons=yes,clearsessioncache=no');
    browser.on('loadstop').subscribe((event: InAppBrowserEvent) => {
      const closeUrl = 'https://commitfrequency.firebaseapp.com/__/auth/handler';
      if (event.url.startsWith(closeUrl)) {
        browser.close();
        this.navCtrl.setRoot('TabsPage');
      }
    }, err => {
      console.error(`Error while logging in: ${err}`);
    });
  }

}
