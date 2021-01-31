import { Component, OnInit } from '@angular/core';
import { MainComponenetsService } from './../../../@shared/services/main-componenets.service';
import { environment } from '@env/environment';
import { NotifierService } from 'angular-notifier';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shops-listing',
  templateUrl: './shops-listing.component.html',
  styleUrls: ['./shops-listing.component.scss'],
})
export class ShopsListingComponent implements OnInit {
  displayedColumns: string[] = [
    'image',
    'name',
    'transaction_id',
    'category',
    'services',
    'reviews',
    'ph#',
    'status',
    'actions',
  ];
  listData: any = [];
  baseUrl: any = environment.serverUrl;
  verification_status: boolean = false;
  isLoading: boolean = false;

  constructor(private mcService: MainComponenetsService, private notifier: NotifierService) {}

  ngOnInit(): void {
    // this.listData = ELEMENT_DATA;

    this.getAllShops();
  }

  toggle_status(id: any) {
    this.mcService.toggleShopStatus(id).subscribe(
      (res) => {
        this.getAllShops();
        this.verification_status = !this.verification_status;
        this.notifier.notify('success', 'Status updated successfully');
      },
      (error) => {
        this.notifier.notify('error', 'Error occured while updating status');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  getAllShops() {
    this.isLoading = true;
    this.mcService.getAllShops().subscribe(
      (res) => {
        this.listData = res.data;
        this.listData.map((e: any) => {
          if (e.verification_status == 'ACTIVE') {
            e.status = true;
          } else {
            e.status = false;
          }
        });

        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  deleteShop(id: any) {
    this.isLoading = true;
    this.mcService.deleteShop(id).subscribe(
      (res) => {
        this.getAllShops();
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }
}
