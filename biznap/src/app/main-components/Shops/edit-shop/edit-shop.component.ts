import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainComponenetsService } from './../../../@shared/services/main-componenets.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.component.html',
  styleUrls: ['./edit-shop.component.scss'],
})
export class EditShopComponent implements OnInit {
  updateShopForm: FormGroup;
  imgURL: any;
  imageFile: any;
  shopCategories: any;
  shopId: any;
  isLoading: boolean = false;
  allFieldworkers: any;

  verificationStatus: any = [
    {
      id: 1,
      status: 'PENDING',
    },
    {
      id: 2,
      status: 'ACTIVE',
    },
  ];

  constructor(
    private formbuilder: FormBuilder,
    private mcService: MainComponenetsService,
    private router: Router,
    private route: ActivatedRoute,
    public notifier: NotifierService
  ) {
    this.route.params.subscribe((params: any) => {
      this.shopId = params.id;
    });
    this.createForm();
  }

  ngOnInit(): void {
    this.getAllFieldWorkers();
    this.getAllCategories();
    this.getShopById(this.shopId);
  }

  previewImage(event: any) {
    let reader = new FileReader();
    this.imageFile = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  getAllCategories() {
    this.mcService.getAllCategories().subscribe((res) => {
      this.shopCategories = res.data;
    });
  }

  removeImage() {
    this.imgURL = null;
    this.imageFile = null;
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

  getShopById(id: any) {
    this.isLoading = true;
    this.mcService.getShopById(id).subscribe(
      (res) => {
        this.isLoading = false;
        this.imgURL = environment.serverUrl + res.data[0].img_url;
        let opening_time = moment(res.data[0].opening_time, 'HH:mm').format('hh:mm');
        let closing_time = moment(res.data[0].closing_time, 'HH:mm').format('hh:mm');
        this.updateShopForm.setValue({
          name: res.data[0].name,
          address: res.data[0].address,
          transaction_id: res.data[0].transaction_id,
          transaction_amount: res.data[0].transaction_amount,
          transaction_method: res.data[0].transaction_method,
          owner_name: res.data[0].owner_name,
          category_id: res.data[0].categoryId,
          fieldWorker_id: res.data[0].fieldWorkerId,
          opening_time: opening_time,
          closing_time: closing_time,
          email: res.data[0].email,
          phone_number: res.data[0].phone_number,
          longitude: res.data[0].longitude,
          latitude: res.data[0].latitude,
          password: res.data[0].password,
          verification_status: res.data[0].verification_status == 'ACTIVE' ? 2 : 1,
        });
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  updateShop() {
    if (this.updateShopForm.invalid) {
      return;
    }

    this.isLoading = true;
    let data = {
      id: this.shopId,
      name: this.updateShopForm.value.name,
      address: this.updateShopForm.value.address,
      transaction_id: this.updateShopForm.value.transaction_id,
      transaction_amount: this.updateShopForm.value.transaction_amount,
      transaction_method: this.updateShopForm.value.transaction_method,
      longitude: this.updateShopForm.value.longitude,
      latitude: this.updateShopForm.value.latitude,
      owner_name: this.updateShopForm.value.owner_name,
      category_id: this.updateShopForm.value.category_id,
      fieldWorker_id: this.updateShopForm.value.fieldWorker_id,
      opening_time: this.updateShopForm.value.opening_time,
      closing_time: this.updateShopForm.value.closing_time,
      email: this.updateShopForm.value.email,
      password: this.updateShopForm.value.password,
      phone_number: this.updateShopForm.value.phone_number,
      image: this.imageFile ? this.imageFile : '',
      verification_status: this.updateShopForm.value.verification_status == 2 ? 'ACTIVE' : 'PENDING',
    };

    this.mcService.updateShop(data).subscribe(
      (res) => {
        this.isLoading = false;
        this.notifier.notify('success', 'Shop Updated successfully');
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
    this.updateShopForm = this.formbuilder.group({
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
      verification_status: ['', [Validators.required]],
    });
  }
}
