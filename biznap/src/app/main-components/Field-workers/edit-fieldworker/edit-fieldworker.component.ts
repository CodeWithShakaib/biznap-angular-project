import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainComponenetsService } from './../../../@shared/services/main-componenets.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-fieldworker',
  templateUrl: './edit-fieldworker.component.html',
  styleUrls: ['./edit-fieldworker.component.scss'],
})
export class EditFieldworkerComponent implements OnInit {
  updateFieldworkerForm: FormGroup;
  imgURL: any;
  imageFile: any;
  fieldWorkerId: any;
  isLoading: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private mcService: MainComponenetsService,
    private router: Router,
    private route: ActivatedRoute,
    public notifier: NotifierService
  ) {
    this.route.params.subscribe((params: any) => {
      this.fieldWorkerId = params.id;
    });
    this.createForm();
  }

  ngOnInit(): void {
    this.getFieldWorkerById(this.fieldWorkerId);
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
    this.imgURL = null;
    this.imageFile = null;
  }

  getFieldWorkerById(id: any) {
    this.isLoading = true;
    this.mcService.getFieldWorkerById(id).subscribe(
      (res) => {
        this.imgURL = environment.serverUrl + res.data[0].img_url;
        this.updateFieldworkerForm.setValue({
          f_name: res.data[0].f_name,
          l_name: res.data[0].l_name,
          cnic: res.data[0].cnic,
          address: res.data[0].address,
          phone_number: res.data[0].phone_number,
          gender: res.data[0].gender,
        });
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  updateFieldworker() {
    if (this.updateFieldworkerForm.invalid) {
      return;
    }
    this.isLoading = true;
    let data = {
      id: this.fieldWorkerId,
      f_name: this.updateFieldworkerForm.value.f_name,
      l_name: this.updateFieldworkerForm.value.l_name,
      image: this.imageFile ? this.imageFile : '',
      cnic: this.updateFieldworkerForm.value.cnic,
      address: this.updateFieldworkerForm.value.address,
      phone_number: this.updateFieldworkerForm.value.phone_number,
      gender: this.updateFieldworkerForm.value.gender,
    };

    this.mcService.updateFieldWorker(data).subscribe(
      (res) => {
        this.isLoading = false;
        this.notifier.notify('success', 'Fieldworker Updated successfully');
        this.router.navigate(['fieldworkers']);
      },
      (error) => {
        this.isLoading = false;
        this.notifier.notify('error', 'Something went wrong, please try again');
        console.log(error);
      }
    );
  }

  private createForm() {
    this.updateFieldworkerForm = this.formbuilder.group({
      f_name: ['', [Validators.required]],
      l_name: ['', [Validators.required]],
      cnic: ['', [Validators.required]],
      address: ['', [Validators.required]],
      // image: [''],
      phone_number: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }
}
