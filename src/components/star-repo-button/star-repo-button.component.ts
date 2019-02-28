import { Component, Input } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { StarredServiceProvider } from '../../providers/starred/starred.service';

@Component({
  selector: 'star-repo-button',
  templateUrl: 'star-repo-button.html'
})
export class StarRepoButtonComponent {

  @Input() fullName: string = '';
  starred: boolean = true;
  constructor(
    private app: App,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private starredService: StarredServiceProvider) {
  }

  starRepository(repository: string) {
    var ght = localStorage.getItem('ght');
    if (!ght) {
      this.showNoTokenAlert();
      this.app.getRootNav().setRoot('LoginPage');
    } else {
      this.starredService.starRepo(repository, ght)
        .subscribe(res => {
          this.starred = true;
        }, err => {
          this.starAlert(err.message);
        });
    }
  }

  unstarRepository(repository: string) {
    var ght = localStorage.getItem('ght');
    if (!ght) {
      this.showNoTokenAlert();
      this.app.getRootNav().setRoot('LoginPage');
    } else {
      this.starredService.unstarRepo(repository, ght)
      .subscribe(res => {
        this.starred = false;
      }, err => {
        this.unstarAlert(err.message);
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

  starAlert(message: any) {
    const alert = this.alertCtrl.create({
      title: 'GitHub Error',
      subTitle: `Error starring repository: ${message}`,
      buttons: ['SORRY']
    });
    alert.present();
  }

  unstarAlert(message: any) {
    const alert = this.alertCtrl.create({
      title: 'GitHub Error',
      subTitle: `Error unstarring repository: ${message}`,
      buttons: ['SORRY']
    });
    alert.present();
  }

}
