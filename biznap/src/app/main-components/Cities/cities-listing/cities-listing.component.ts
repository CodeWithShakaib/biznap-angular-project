import { Component, OnInit } from '@angular/core';
import { MainComponenetsService } from './../../../@shared/services/main-componenets.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-cities-listing',
  templateUrl: './cities-listing.component.html',
  styleUrls: ['./cities-listing.component.scss'],
})
export class CitiesListingComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'createdAt', 'updatedAt'];
  listData: any = [];
  baseUrl: any = environment.serverUrl;
  isLoading: boolean = false;

  constructor(private mcService: MainComponenetsService) {}

  ngOnInit(): void {
    this.getAllCities();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  getAllCities() {
    this.isLoading = true;
    this.mcService.getAllCities().subscribe((res) => {
      this.listData = res.data;
      this.isLoading = false;
    });
  }
}
