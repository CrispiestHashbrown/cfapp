import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommitCountServiceProvider } from '../../providers/commit-count/commit-count.service';
import * as moment from 'moment/moment.js';

@Component({
  selector: 'commit-graph',
  templateUrl: 'commit-graph.html'
})
export class CommitGraphComponent {

  @Input() fullName: string = '';
  weeksLabels: string[] = [];
  commitData: any[] = [{data: [], label: 'Commits per Week'}];
  barChartColors: Array<any> = [{
    backgroundColor: '#9CCC65'
  }];
  barChartType: string = 'bar';
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: false,
    }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private commitService: CommitCountServiceProvider) {
  }

  ngOnChanges() {
    this.getGraphData();
  }

  getGraphData() {
    this.getCommitStats(this.fullName);
    this.getPastDates();
  }

  chartClicked(e:any):void {
    console.log(e);
  }
 
  chartHovered(e:any):void {
    console.log(e);
  }
 
  getCommitStats(repo: string) {
    this.commitData = [{data: [], label: 'Commits per Week'}];;
    this.commitService.getRepoCommitCount(`${repo}`)
      .subscribe(triggeredGitHubJobResponse => {
        this.commitService.getRepoCommitCount(`${repo}`)
          .subscribe(res => {
            var data = res.body.all.slice(28, 52);
            var clone = JSON.parse(JSON.stringify(this.commitData));
            clone[0].data = data;
            this.commitData = clone;
          },
          err => {
            console.log(`Error fetching commit stats: ${err}`);
          });
      },
      err => {
        console.log(`Error triggering GitHub job: ${err}`);
      });
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

}
