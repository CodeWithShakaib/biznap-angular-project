import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainComponenetsService } from './../../../@shared/services/main-componenets.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-ads',
  templateUrl: './edit-ads.component.html',
  styleUrls: ['./edit-ads.component.scss'],
})
export class EditAdsComponent implements OnInit {
  updateAdForm: FormGroup;
  imgURL: any;
  imageFile: any;
  adId: any;
  isLoading: boolean = false;
  shopDropdown: any;
  today: Date;
  shopCategories: any;

  constructor(
    private formbuilder: FormBuilder,
    private mcService: MainComponenetsService,
    private router: Router,
    private route: ActivatedRoute,
    public notifier: NotifierService
  ) {
    this.route.params.subscribe((params: any) => {
      this.adId = params.id;
    });
    this.createForm();
    this.today = new Date();
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllShops();
    this.getAdById(this.adId);
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

  getAdById(id: any) {
    this.isLoading = true;
    this.mcService.getAdById(id).subscribe(
      (res) => {
        this.imgURL = environment.serverUrl + res.data[0].img_url;
        let start_at = moment(res.data[0].start_at).format('YYYY-MM-DD');
        let end_at = moment(res.data[0].end_at).format('YYYY-MM-DD');
        this.updateAdForm.setValue({
          title: res.data[0].title,
          views_count: 0,
          duration: 0,
          start_at: start_at,
          end_at: end_at,
          shop_id: res.data[0].shopId,
          category_id: res.data[0].categoryId,
          transaction_id: res.data[0].transaction_id,
          transaction_amount: res.data[0].transaction_amount,
          transaction_method: res.data[0].transaction_method,
          status: '',
        });
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  updateAd() {
    if (this.updateAdForm.invalid) {
      return;
    }

    // let start_at = moment(this.updateAdForm.value.start_at).format('YYYY-MM-DD');
    // let end_at = moment(this.updateAdForm.value.end_at).format('YYYY-MM-DD');

    this.isLoading = true;
    let data = {
      title: this.updateAdForm.value.title,
      type: 'PENDING',
      views_count: 0,
      duration: 0,
      start_at: this.updateAdForm.value.start_at,
      end_at: this.updateAdForm.value.end_at,
      shop_id: this.updateAdForm.value.shop_id,
      category_id: this.updateAdForm.value.category_id,
      image: this.imageFile ? this.imageFile : '',
      video: '',
      transaction_id: this.updateAdForm.value.transaction_id,
      transaction_amount: this.updateAdForm.value.transaction_amount,
      transaction_method: this.updateAdForm.value.transaction_method,
      status: this.updateAdForm.value.transaction_method,
    };

    this.mcService.updateAd(data).subscribe(
      (res) => {
        this.isLoading = false;
        this.notifier.notify('success', 'Ad Updated successfully');
        this.router.navigate(['ads']);
      },
      (error) => {
        this.isLoading = false;
        this.notifier.notify('error', 'Something went wrong, please try again');
        console.log(error);
      }
    );
  }

  private createForm() {
    this.updateAdForm = this.formbuilder.group({
      title: ['', [Validators.required]],
      views_count: [''],
      duration: [''],
      start_at: [''],
      end_at: [''],
      shop_id: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      transaction_id: ['', [Validators.required]],
      transaction_amount: ['', [Validators.required]],
      transaction_method: ['', [Validators.required]],
      status: [''],
    });
  }
}
