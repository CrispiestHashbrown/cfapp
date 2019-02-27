import { Component, Input } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CommitCountServiceProvider } from '../../providers/commit-count/commit-count.service';
import * as moment from 'moment/moment.js';

@Component({
  selector: 'commit-graph',
  templateUrl: 'commit-graph.html'
})
export class CommitGraphComponent {

  @Input() fullName: string = '';
  weeksLabels: string[] = [];
  commitData: any[] = [{
    data: [], 
    label: 'Commits per Week'
  }];
  barChartColors: Array<any> = [{
    backgroundColor: '#9ccc65'
  }];
  barChartType: string = 'bar';
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: false,
    }
  };

  constructor(
    private app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private commitService: CommitCountServiceProvider) {
  }

  ngOnChanges() {
    this.getGraphData();
  }

  getGraphData() {
    this.getCommitStats(this.fullName);
    this.getPastDates();
  }

  chartClicked(e: any):void {
    console.log(e);
  }
 
  chartHovered(e:any):void {
    console.log(e);
  }
 
  getCommitStats(repo: string) {
    this.commitData = [{data: [], label: 'Commits per Week'}];;
    var ght = localStorage.getItem('ght');
    if (!ght) {
      this.showNoTokenAlert();
      this.app.getRootNav().setRoot('LoginPage');
    } else {
      this.commitService.getRepoCommitCount(`${repo}`, ght)
        .subscribe(triggeredGitHubJobResponse => {
          this.commitService.getRepoCommitCount(`${repo}`, ght)
            .subscribe(res => {
              var data = res.body.all.slice(28, 52);
              var clone = JSON.parse(JSON.stringify(this.commitData));
              clone[0].data = data;
              this.commitData = clone;
            }, err => {
              this.showCommitServiceAlert(`${err.message}`);
            });
        }, err => {
          this.showGitHubCommitAlert(`${err.message}`);
        });
    }
  }

  getPastDates() {
    this.weeksLabels = [];
    var today: string = new Date().toLocaleDateString();
    for (var i = 23; i > 0; i--) {
      this.weeksLabels.push(moment(today, 'l').subtract(i, 'weeks').format('l').toString());
      if (i === 1) {
        this.weeksLabels.push(today);
      }
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

  showCommitServiceAlert(message: string) {
    const alert = this.alertCtrl.create({
      title: 'Commit Service Error',
      subTitle: `Error fetching commit stats: ${message}`,
      buttons: ['SORRY']
    });
    alert.present();
  }

  showGitHubCommitAlert(message: string) {
    const alert = this.alertCtrl.create({
      title: 'GitHub Error',
      subTitle: `Error triggering GitHub job: ${message}`,
      buttons: ['SORRY']
    });
    alert.present();
  }

}
