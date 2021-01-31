import { Component, OnInit } from '@angular/core';
import { MainComponenetsService } from './../../../@shared/services/main-componenets.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.scss'],
})
export class CategoryListingComponent implements OnInit {
  displayedColumns: string[] = ['icon', 'name', 'description', 'actions'];
  listData: any = [];
  baseUrl: any = environment.serverUrl;
  isLoading: boolean = false;

  constructor(private mcService: MainComponenetsService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  getAllCategories() {
    this.isLoading = true;
    this.mcService.getAllCategories().subscribe(
      (res) => {
        this.listData = res.data;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  deleteCategory(id: any) {
    this.isLoading = true;
    this.mcService.deleteCategory(id).subscribe(
      (res) => {
        this.getAllCategories();
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }
}
