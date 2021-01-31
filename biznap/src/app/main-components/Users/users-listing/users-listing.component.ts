import { Component, OnInit } from '@angular/core';
import { MainComponenetsService } from './../../../@shared/services/main-componenets.service';
import { environment } from '@env/environment';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss'],
})
export class UsersListingComponent implements OnInit {
  displayedColumns: string[] = ['image', 'f_name', 'l_name', 'email', 'phone_number', 'type', 'password', 'actions'];
  listData: any = [];
  baseUrl: any = environment.serverUrl;
  isLoading: boolean = false;
  filterUsers: any[];
  searchkey: any;

  constructor(private mcService: MainComponenetsService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.isLoading = true;
    this.mcService.getAllUsers().subscribe(
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

  deleteUser(id: any) {
    this.isLoading = true;
    this.mcService.deleteUser(id).subscribe(
      (res) => {
        console.log('deleted ', res);
        this.getAllUsers();
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  applyFilter(event: any) {
    this.listData.filter = this.searchkey.trim().toLocaleLowerCase();
    this.listData.filter = this.searchkey.trim();

    // this.listData = [...this.listData.filter((data: any) => data.f_name.includes(this.searchkey))]
  }
}
