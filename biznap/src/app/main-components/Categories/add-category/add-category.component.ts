import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainComponenetsService } from './../../../@shared/services/main-componenets.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm: FormGroup;
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

  addCategory() {
    if (this.addCategoryForm.invalid) {
      console.log('invajvlakj');
      return;
    }

    this.isLoading = true;
    let data = {
      name: this.addCategoryForm.value.name,
      description: this.addCategoryForm.value.description,
      image: this.imageFile,
    };

    this.mcService.addCategory(data).subscribe(
      (res) => {
        this.isLoading = false;
        this.notifier.notify('success', 'Category created successfully');
        this.router.navigate(['categories']);
      },
      (error) => {
        this.isLoading = false;
        this.notifier.notify('error', 'Something went wrong, please try again');
        console.log(error);
      }
    );
  }

  private createForm() {
    this.addCategoryForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      icon: [''],
    });
  }
}
