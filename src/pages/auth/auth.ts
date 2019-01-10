import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  constructor(private navCtrl: NavController, private http: HttpClient, private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.http.get('https://commitfrequency.firebaseapp.com/__/auth/ping', {observe: 'response'})
      .subscribe(res => {
        if (res.status === 204) {
          this.navCtrl.setRoot('TabsPage');
        } else {
          this.navCtrl.setRoot('LoginPage');
        }
      }, err => {
        console.log("Error: ", err);
        this.navCtrl.setRoot('LoginPage');
      });
  }

}
