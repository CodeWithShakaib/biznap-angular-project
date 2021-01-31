import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainComponenetsService } from './../../../@shared/services/main-componenets.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.scss'],
})
export class AddAdsComponent implements OnInit {
  createAdForm: FormGroup;
  imgURL: any;
  imageFile: any;
  shopCategories: any;
  isLoading: boolean = false;
  shopDropdown: any;
  today: Date;

  constructor(
    private formbuilder: FormBuilder,
    private mcService: MainComponenetsService,
    private router: Router,
    public notifier: NotifierService
  ) {
    this.createForm();
    this.today = new Date();
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllShops();
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

  getAllCategories() {
    this.mcService.getAllCategories().subscribe((res) => {
      this.shopCategories = res.data;
    });
  }

  getAllShops() {
    this.isLoading = true;
    this.mcService.getAllShops().subscribe(
      (res) => {
        this.shopDropdown = res.data.map((e: any) => {
          return {
            id: e.id,
            name: e.name,
          };
        });

        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  createAd() {
    if (this.createAdForm.invalid) {
      return;
    }

    this.isLoading = true;
    let data = {
      title: this.createAdForm.value.title,
      type: 'defalut',
      views_count: 0,
      duration: 0,
      start_at: this.createAdForm.value.start_at,
      end_at: this.createAdForm.value.end_at,
      shop_id: this.createAdForm.value.shop_id,
      category_id: this.createAdForm.value.category_id,
      image: this.imageFile,
      video: '',
      transaction_id: this.createAdForm.value.transaction_id,
      transaction_amount: this.createAdForm.value.transaction_amount,
      transaction_method: this.createAdForm.value.transaction_method,
      status: 'PENDING',
    };

    this.mcService.createAd(data).subscribe(
      (res) => {
        this.isLoading = false;
        this.notifier.notify('success', 'Ad created successfully');
        this.router.navigate(['ads']);
      },
      (error) => {
        console.log(error);
        this.notifier.notify('error', 'Something went wrong, please try again');
        this.isLoading = false;
      }
    );
  }

  private createForm() {
    this.createAdForm = this.formbuilder.group({
      title: ['', [Validators.required]],
      views_count: [''],
      duration: [''],
      start_at: ['', [Validators.required]],
      end_at: ['', [Validators.required]],
      shop_id: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      image: [''],
      video: [''],
      transaction_id: ['', [Validators.required]],
      transaction_amount: ['', [Validators.required]],
      transaction_method: ['', [Validators.required]],
      status: [''],
    });
  }
}
