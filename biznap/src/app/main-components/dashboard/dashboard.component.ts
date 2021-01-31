import { Component, OnInit } from '@angular/core';
import { MainComponenetsService } from './../../@shared/services/main-componenets.service';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isLoading: boolean = false;

  // cards
  shopsData: any;
  adsData: any;
  fieldworkersData: any;
  userData: any;

  // charts
  view: any[] = [500, 200];
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  shopscolorScheme = {
    domain: ['#28a745', '#ffc107'],
  };
  shopsChartData: any;

  adscolorScheme = {
    domain: ['#ffc107', '#7977f5', '#28a745'],
  };
  adsChartData: any;

  constructor(private mcService: MainComponenetsService, private media: MediaObserver) {}

  ngOnInit(): void {
    this.getAllShops();
    this.getAllAds();
    this.getAllFieldWorkers();
    this.getAllUsers();
  }

  // get all shops
  getAllShops() {
    this.isLoading = true;
    this.mcService.getAllShops().subscribe(
      (res) => {
        let active_val = 0;
        let pending_val = 0;

        this.shopsData = res.data;
        this.shopsChartData = this.shopsData.map((e: any) => {
          if (e.verification_status == 'ACTIVE') {
            active_val = active_val + 1;
          } else {
            pending_val = pending_val + 1;
          }
        });

        this.shopsChartData = [
          {
            name: 'ACTIVE',
            value: active_val,
          },
          {
            name: 'PENDING',
            value: pending_val,
          },
        ];

        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  // get all ads
  getAllAds() {
    this.isLoading = true;
    this.mcService.getAllAds().subscribe(
      (res) => {
        let live_val = 0;
        let active_val = 0;
        let pending_val = 0;

        this.adsData = res.data;
        this.adsChartData = this.adsData.map((e: any) => {
          // if live
          if (e.status == 'ACTIVE' && e.isLive == true) {
            live_val = live_val + 1;
          }

          // if active
          else if (e.status == 'ACTIVE' && e.isLive == false) {
            active_val = active_val + 1;
          } else if (e.status == 'PENDING' && e.isLive == false) {
            pending_val = pending_val + 1;
          } else {
            console.log('invalid');
          }
        });

        this.adsChartData = [
          {
            name: 'PENDING',
            value: pending_val,
          },
          {
            name: 'ACTIVE',
            value: active_val,
          },
          {
            name: 'LIVE',
            value: live_val,
          },
        ];

        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  // get all fieldworkers
  getAllFieldWorkers() {
    this.isLoading = true;
    this.mcService.getAllFieldWorkers().subscribe(
      (res) => {
        this.fieldworkersData = res.data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  // get all users
  getAllUsers() {
    this.isLoading = true;
    this.mcService.getAllUsers().subscribe(
      (res) => {
        this.userData = res.data;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  // shops events
  onshopSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onshopActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onshopDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }
}
