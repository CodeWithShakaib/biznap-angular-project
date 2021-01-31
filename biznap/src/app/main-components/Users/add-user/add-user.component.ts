import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainComponenetsService } from './../../../@shared/services/main-componenets.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  imgURL: any;
  imageFile: any;
  isLoading: any = false;

  constructor(
    private formbuilder: FormBuilder,
    private mcService: MainComponenetsService,
    private router: Router,
    public notifier: NotifierService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

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

  addUser() {
    if (this.addUserForm.invalid) {
      return;
    }

    this.isLoading = true;
    let data = {
      f_name: this.addUserForm.value.f_name,
      l_name: this.addUserForm.value.l_name,
      email: this.addUserForm.value.email,
      password: this.addUserForm.value.password,
      phone_number: this.addUserForm.value.phone_number,
      image: this.imageFile,
    };

    this.mcService.addUser(data).subscribe(
      (res) => {
        this.isLoading = false;
        this.notifier.notify('success', 'User created successfully');
        this.router.navigate(['users']);
      },
      (error) => {
        this.isLoading = false;
        this.notifier.notify('error', 'Something went wrong, please try again');
        console.log(error);
      }
    );
  }

  private createForm() {
    this.addUserForm = this.formbuilder.group({
      f_name: ['', [Validators.required]],
      l_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[a-zA-z]{2,4}$')]],
      password: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
    });
  }
}
