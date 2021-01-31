import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainComponenetsService } from './../../../@shared/services/main-componenets.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-fieldworker',
  templateUrl: './add-fieldworker.component.html',
  styleUrls: ['./add-fieldworker.component.scss'],
})
export class AddFieldworkerComponent implements OnInit {
  addFieldworkerForm: FormGroup;
  imgURL: any;
  imageFile: any;
  isLoading: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private mcService: MainComponenetsService,
    private router: Router,
    public notifier: NotifierService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  removeImage() {
    this.imageFile = null;
    this.imgURL = null;
  }

  previewImage(event: any) {
    let reader = new FileReader();
    this.imageFile = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  addFieldworker() {
    if (this.addFieldworkerForm.invalid) {
      return;
    }

    this.isLoading = true;
    let data = {
      f_name: this.addFieldworkerForm.value.f_name,
      l_name: this.addFieldworkerForm.value.l_name,
      image: this.imageFile,
      cnic: this.addFieldworkerForm.value.cnic,
      address: this.addFieldworkerForm.value.address,
      phone_number: this.addFieldworkerForm.value.phone_number,
      gender: this.addFieldworkerForm.value.gender,
    };

    this.mcService.addFieldWorker(data).subscribe(
      (res) => {
        this.isLoading = false;
        this.notifier.notify('success', 'Fieldworker created successfully');
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
    this.addFieldworkerForm = this.formbuilder.group({
      f_name: ['', [Validators.required]],
      l_name: ['', [Validators.required]],
      cnic: ['', [Validators.required]],
      address: ['', [Validators.required]],
      image: [''],
      phone_number: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }
}
