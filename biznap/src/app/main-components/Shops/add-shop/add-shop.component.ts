import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainComponenetsService } from './../../../@shared/services/main-componenets.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.scss'],
})
export class AddShopComponent implements OnInit {
  addShopForm: FormGroup;
  imgURL: any;
  imageFile: any;
  shopCategories: any;
  isLoading: boolean = false;
  allFieldworkers: any;

  constructor(
    private formbuilder: FormBuilder,
    private mcService: MainComponenetsService,
    private router: Router,
    public notifier: NotifierService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllFieldWorkers();
  }

  getAllCategories() {
    this.mcService.getAllCategories().subscribe((res) => {
      this.shopCategories = res.data;
    });
  }

  previewImage(event: any) {
    let reader = new FileReader();
    this.imageFile = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  removeImage() {
    this.imageFile = null;
    this.imgURL = null;
  }

  getAllFieldWorkers() {
    this.mcService.getAllFieldWorkers().subscribe(
      (res) => {
        this.allFieldworkers = res.data.map((e: any) => {
          return {
            id: e.id,
            name: e.f_name + ' ' + e.l_name,
          };
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addShop() {
    if (this.addShopForm.invalid) {
      return;
    }

    this.isLoading = true;
    let data = {
      name: this.addShopForm.value.name,
      address: this.addShopForm.value.address,
      transaction_id: this.addShopForm.value.transaction_id,
      transaction_amount: this.addShopForm.value.transaction_amount,
      transaction_method: this.addShopForm.value.transaction_method,
      longitude: 73.0615518,
      latitude: 33.6589729,
      owner_name: this.addShopForm.value.owner_name,
      category_id: this.addShopForm.value.category_id,
      fieldWorker_id: this.addShopForm.value.fieldWorker_id,
      opening_time: this.addShopForm.value.opening_time,
      closing_time: this.addShopForm.value.closing_time,
      email: this.addShopForm.value.email,
      password: this.addShopForm.value.password,
      phone_number: this.addShopForm.value.phone_number,
      image: this.imageFile,
      verification_status: 'PENDING',
    };

    console.log(data);
    return;

    this.mcService.addShop(data).subscribe(
      (res) => {
        this.isLoading = false;
        this.notifier.notify('success', 'Shop created successfully');
        this.router.navigate(['shops']);
      },
      (error) => {
        this.isLoading = false;
        this.notifier.notify('error', 'Something went wrong, please try again');
        console.log(error);
      }
    );
  }

  private createForm() {
    this.addShopForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      transaction_id: ['', [Validators.required]],
      transaction_amount: ['', [Validators.required]],
      transaction_method: ['', [Validators.required]],
      longitude: [''],
      latitude: [''],
      owner_name: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      fieldWorker_id: ['', [Validators.required]],
      opening_time: ['', [Validators.required]],
      closing_time: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[a-zA-z]{2,4}$')]],
      password: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
    });
  }
}
