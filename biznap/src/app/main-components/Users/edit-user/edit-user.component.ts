import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainComponenetsService } from './../../../@shared/services/main-componenets.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  updateUserForm: FormGroup;
  imgURL: any;
  imageFile: any;
  userId: any;
  isLoading: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private mcService: MainComponenetsService,
    private router: Router,
    private route: ActivatedRoute,
    public notifier: NotifierService
  ) {
    this.route.params.subscribe((params: any) => {
      this.userId = params.id;
    });
    this.createForm();
  }

  ngOnInit(): void {
    this.getUserById(this.userId);
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

  getUserById(id: any) {
    this.isLoading = true;
    this.mcService.getUserById(id).subscribe(
      (res) => {
        this.imgURL = environment.serverUrl + res.data[0].img_url;
        this.updateUserForm.setValue({
          f_name: res.data[0].f_name,
          l_name: res.data[0].l_name,
          email: res.data[0].email,
          password: res.data[0].password,
          phone_number: res.data[0].phone_number,
        });
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  updateUser() {
    if (this.updateUserForm.invalid) {
      return;
    }

    this.isLoading = true;
    let data = {
      id: this.userId,
      f_name: this.updateUserForm.value.f_name,
      l_name: this.updateUserForm.value.l_name,
      email: this.updateUserForm.value.email,
      password: this.updateUserForm.value.password,
      phone_number: this.updateUserForm.value.phone_number,
      image: this.imageFile ? this.imageFile : '',
    };

    this.mcService.updateUser(data).subscribe(
      (res) => {
        this.isLoading = false;
        this.notifier.notify('success', 'User Updated successfully');
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
    this.updateUserForm = this.formbuilder.group({
      f_name: ['', [Validators.required]],
      l_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[a-zA-z]{2,4}$')]],
      password: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
    });
  }
}
