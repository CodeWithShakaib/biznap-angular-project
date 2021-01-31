import { Component, OnInit } from '@angular/core';
import { MainComponenetsService } from './../../../@shared/services/main-componenets.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-fieldworkers-listing',
  templateUrl: './fieldworkers-listing.component.html',
  styleUrls: ['./fieldworkers-listing.component.scss'],
})
export class FieldworkersListingComponent implements OnInit {
  displayedColumns: string[] = ['id', 'image', 'f_name', 'l_name', 'cnic', 'phone', 'gender', 'actions'];
  listData: any = [];
  baseUrl: any = environment.serverUrl;
  isLoading: boolean = false;

  constructor(private mcService: MainComponenetsService) {}

  ngOnInit(): void {
    this.getAllFieldWorkers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  getAllFieldWorkers() {
    this.isLoading = true;
    this.mcService.getAllFieldWorkers().subscribe(
      (res) => {
        this.listData = res.data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  deleteFieldWorker(id: any) {
    this.isLoading = true;
    this.mcService.deleteFieldWorker(id).subscribe(
      (res) => {
        this.getAllFieldWorkers();
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }
}
