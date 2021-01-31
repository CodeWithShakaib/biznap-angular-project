import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainComponenetsService } from './../../../@shared/services/main-componenets.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss'],
})
export class AddCityComponent implements OnInit {
  addCityForm: FormGroup;
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

  addCity() {
    if (this.addCityForm.invalid) {
      return;
    }

    this.isLoading = true;
    let data = {
      name: this.addCityForm.value.name,
      description: this.addCityForm.value.description,
    };

    this.mcService.addCity(data).subscribe(
      (res) => {
        this.isLoading = false;
        this.notifier.notify('success', 'City created successfully');
        this.router.navigate(['cities']);
      },
      (error) => {
        this.isLoading = false;
        this.notifier.notify('error', 'Something went wrong, please try again');
        console.log(error);
      }
    );
  }

  private createForm() {
    this.addCityForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
}
