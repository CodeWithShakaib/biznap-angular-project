import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainComponenetsService } from './../../../@shared/services/main-componenets.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment.prod';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  editCategoryForm: FormGroup;
  imgURL: any;
  imageFile: any;
  categoryId: any;
  isLoading: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private mcService: MainComponenetsService,
    private router: Router,
    private route: ActivatedRoute,
    public notifier: NotifierService
  ) {
    this.route.params.subscribe((params: any) => {
      this.categoryId = params.id;
    });
    this.createForm();
  }

  ngOnInit(): void {
    this.getCategoryById(this.categoryId);
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

  getCategoryById(id: any) {
    this.isLoading = true;
    this.mcService.getCategoryById(id).subscribe(
      (res) => {
        this.imgURL = environment.serverUrl + res.data[0].icon;
        this.editCategoryForm.setValue({
          name: res.data[0].name,
          description: res.data[0].description,
          // icon: res.data[0].icon
        });
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  updateCategory() {
    if (this.editCategoryForm.invalid) {
      return;
    }

    this.isLoading = true;
    let data = {
      id: this.categoryId,
      name: this.editCategoryForm.value.name,
      description: this.editCategoryForm.value.description,
      image: this.imageFile ? this.imageFile : '',
    };

    this.mcService.updateCategory(data).subscribe(
      (res) => {
        this.isLoading = false;
        this.notifier.notify('success', 'Category Updated successfully');
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
    this.editCategoryForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      // icon: ['', [Validators.required]]
    });
  }
}
