import { Component, OnInit } from '@angular/core';
import { MainComponenetsService } from './../../../@shared/services/main-componenets.service';
import { environment } from '@env/environment';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-ads-listing',
  templateUrl: './ads-listing.component.html',
  styleUrls: ['./ads-listing.component.scss'],
})
export class AdsListingComponent implements OnInit {
  displayedColumns: string[] = ['image', 'title', 'start_at', 'end_at', 'status', 'actions'];
  listData: any = [];
  baseUrl: any = environment.serverUrl;
  isLoading: boolean = false;

  constructor(private mcService: MainComponenetsService, private notifier: NotifierService) {}

  ngOnInit(): void {
    this.getAllAds();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  getAllAds() {
    this.isLoading = true;
    this.mcService.getAllAds().subscribe(
      (res) => {
        this.listData = res.data;
        this.isLoading = false;
        this.listData.map((e: any) => {
          if (e.status == 'ACTIVE') {
            e.verification_status = true;
          } else {
            e.verification_status = false;
          }
        });
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  deleteAd(id: any) {
    this.isLoading = true;
    this.mcService.deleteAd(id).subscribe(
      (res) => {
        this.getAllAds();
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  toggle_status(id: any) {
    this.mcService.toggleAdStatus(id).subscribe(
      (res) => {
        this.getAllAds();
        this.notifier.notify('success', 'Status updated successfully');
      },
      (error) => {
        this.notifier.notify('error', 'Error occured while updating status');
      }
    );
  }
}
