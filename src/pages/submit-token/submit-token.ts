import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth/auth.service';

@IonicPage()
@Component({
  selector: 'page-submit-token',
  templateUrl: 'submit-token.html',
})
export class SubmitTokenPage {

  token: string = '';

  constructor(
    public navCtrl: NavController, 
    private authService: AuthServiceProvider,
    private alertCtrl: AlertController) {
  }

  returnToLoginPage() {
    this.navCtrl.pop();
  }

  submitToken() {
    if (!this.token) {
      this.showNoTokenAlert();
    } else {
      this.authService.verifyToken(this.token)
        .subscribe(res => {
          localStorage.setItem('ght', this.token);
          this.navCtrl.setRoot('TabsPage');
        }, err => {
          this.showTokenVerificationAlert(`${err.message}`);
        });
    }
  }

  showNoTokenAlert() {
    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: `No token`,
      buttons: ['SORRY']
    });
    alert.present();
  }

  showTokenVerificationAlert(message: any) {
    const alert = this.alertCtrl.create({
      title: 'Auth Error',
      subTitle: `Error submitting token: ${message}`,
      buttons: ['SORRY']
    });
    alert.present();
  }

}
