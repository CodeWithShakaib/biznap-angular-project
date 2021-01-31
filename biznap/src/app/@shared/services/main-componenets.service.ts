import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MainComponenetsService {
  imgURL: any = '';

  constructor(private http: HttpClient) {}

  // USER MODULE ********************

  // add user
  addUser(value: any): Observable<any> {
    let fd = new FormData();
    fd.append('f_name', value.f_name);
    fd.append('l_name', value.l_name);
    fd.append('email', value.email);
    fd.append('password', value.password);
    fd.append('image', value.image, value.image.name);
    fd.append('phone_number', value.phone_number);

    return this.http.post<any>(`/api/user/create`, fd).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // update user
  updateUser(value: any): Observable<any> {
    let fd = new FormData();
    fd.append('f_name', value.f_name);
    fd.append('l_name', value.l_name);
    fd.append('email', value.email);
    fd.append('password', value.password);
    fd.append('phone_number', value.phone_number);

    if (value.image != '') {
      fd.append('image', value.image, value.image.name);
    }

    return this.http.put<any>(`/api/user/${value.id}/update`, fd).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // get all users
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`/api/user/get`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // get user by Id
  getUserById(id: any): Observable<any> {
    return this.http.get<any>(`/api/user/${id}/get`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // delete user
  deleteUser(id: any): Observable<any> {
    return this.http.delete<any>(`/api/user/${id}/delete`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // SHOPS MODULE ********************

  // get all shops
  getAllShops(): Observable<any> {
    return this.http.get<any>(`/api/shop/get`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // add shop
  addShop(value: any): Observable<any> {
    let fd = new FormData();
    fd.append('name', value.name);
    fd.append('address', value.address);
    fd.append('transaction_id', value.transaction_id);
    fd.append('transaction_amount', value.transaction_amount);
    fd.append('transaction_method', value.transaction_method);
    fd.append('longitude', value.longitude);
    fd.append('latitude', value.latitude);
    fd.append('owner_name', value.owner_name);
    fd.append('category_id', value.category_id);
    fd.append('fieldWorker_id', value.fieldWorker_id);
    fd.append('opening_time', value.opening_time);
    fd.append('closing_time', value.closing_time);
    fd.append('email', value.email);
    fd.append('password', value.password);
    fd.append('image', value.image, value.image.name);
    fd.append('phone_number', value.phone_number);
    fd.append('verification_status', value.verification_status);

    return this.http.post<any>(`/api/shop/create`, fd).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // get shop by Id
  getShopById(id: any): Observable<any> {
    return this.http.get<any>(`/api/shop/${id}/get`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // Update shop
  updateShop(value: any): Observable<any> {
    let fd = new FormData();

    fd.append('name', value.name);
    fd.append('address', value.address);
    fd.append('transaction_id', value.transaction_id);
    fd.append('transaction_amount', value.transaction_amount);
    fd.append('transaction_method', value.transaction_method);
    fd.append('longitude', value.longitude);
    fd.append('latitude', value.latitude);
    fd.append('category_id', value.category_id);
    fd.append('fieldWorker_id', value.fieldWorker_id);
    fd.append('opening_time', value.opening_time);
    fd.append('closing_time', value.closing_time);
    fd.append('owner_name', value.owner_name);
    fd.append('email', value.email);
    fd.append('password', value.password);
    fd.append('phone_number', value.phone_number);
    fd.append('verification_status', value.verification_status);

    if (value.image != '') {
      fd.append('image', value.image, value.image.name);
    }

    return this.http.put<any>(`/api/shop/${value.id}/update`, fd).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // delete shop
  deleteShop(id: any): Observable<any> {
    return this.http.delete<any>(`/api/shop/${id}/delete`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // toggle shop status
  toggleShopStatus(id: any): Observable<any> {
    return this.http.put<any>(`/api/shop/${id}/activateShop`, {}).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // CATEGORY MANAGEMENT *****************

  // get all categories
  getAllCategories(): Observable<any> {
    return this.http.get<any>(`/api/category/get`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // get category by id
  getCategoryById(id: any): Observable<any> {
    return this.http.get<any>(`/api/category/${id}/get`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // add category
  addCategory(value: any): Observable<any> {
    let fd = new FormData();

    fd.append('name', value.name);
    fd.append('description', value.description);
    fd.append('icon', value.image, value.image.name);

    return this.http.post<any>(`/api/category/create`, fd).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // update category updateCategory
  updateCategory(value: any): Observable<any> {
    let fd = new FormData();

    fd.append('name', value.name);
    fd.append('description', value.description);

    if (value.image != '') {
      fd.append('icon', value.image, value.image.name);
    }

    return this.http.put<any>(`/api/category/${value.id}/update`, fd).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // delete category
  deleteCategory(id: any): Observable<any> {
    return this.http.delete<any>(`/api/category/${id}/delete`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // FIELD WORKER MANAGEMENT  **********

  // get all fieldworkers
  getAllFieldWorkers(): Observable<any> {
    return this.http.get<any>(`/api/fieldWorker/get`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // add fieldworker
  addFieldWorker(value: any): Observable<any> {
    let fd = new FormData();
    fd.append('f_name', value.f_name);
    fd.append('l_name', value.l_name);
    fd.append('cnic', value.cnic);
    fd.append('address', value.address);
    fd.append('image', value.image, value.image.name);
    fd.append('phone_number', value.phone_number);
    fd.append('gender', value.gender);

    return this.http.post<any>(`/api/fieldWorker/create`, fd).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // get fieldworker by Id
  getFieldWorkerById(id: any): Observable<any> {
    return this.http.get<any>(`/api/fieldWorker/${id}/get`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // update field worker
  updateFieldWorker(value: any): Observable<any> {
    let fd = new FormData();
    fd.append('f_name', value.f_name);
    fd.append('l_name', value.l_name);
    fd.append('cnic', value.cnic);
    fd.append('address', value.address);
    fd.append('phone_number', value.phone_number);
    fd.append('gender', value.gender);

    if (value.image != '') {
      fd.append('image', value.image, value.image.name);
    }

    return this.http.put<any>(`/api/fieldWorker/${value.id}/update`, fd).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // delete field worker
  deleteFieldWorker(id: any): Observable<any> {
    return this.http.delete<any>(`/api/fieldWorker/${id}/delete`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // ADS MODULE ********************
  getAllAds(): Observable<any> {
    return this.http.get<any>(`/api/ad/get`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // get Ad by id
  getAdById(id: any): Observable<any> {
    return this.http.get<any>(`/api/ad/${id}/get`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // add Ad
  createAd(value: any): Observable<any> {
    let fd = new FormData();
    fd.append('title', value.title);
    fd.append('type', value.type);
    fd.append('views_count', value.views_count);
    fd.append('duration', value.duration);
    fd.append('start_at', value.start_at);
    fd.append('end_at', value.end_at);
    fd.append('shop_id', value.shop_id);
    fd.append('category_id', value.category_id);
    fd.append('image', value.image, value.image.name);
    // video here
    fd.append('transaction_id', value.transaction_id);
    fd.append('transaction_amount', value.transaction_amount);
    fd.append('transaction_method', value.transaction_method);
    fd.append('status', value.status);

    return this.http.post<any>(`/api/ad/create`, fd).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // update Ad
  updateAd(value: any): Observable<any> {
    let fd = new FormData();
    fd.append('title', value.title);
    fd.append('type', value.type);
    fd.append('views_count', value.views_count);
    fd.append('duration', value.duration);
    fd.append('start_at', value.start_at);
    fd.append('end_at', value.end_at);
    fd.append('shop_id', value.shop_id);
    fd.append('category_id', value.category_id);
    fd.append('transaction_id', value.transaction_id);
    fd.append('transaction_amount', value.transaction_amount);
    fd.append('transaction_method', value.transaction_method);
    fd.append('status', value.status);
    if (value.image != '') {
      fd.append('image', value.image, value.image.name);
    }
    // video here

    return this.http.put<any>(`/api/ad/${value.id}/update`, fd).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // delete Ad
  deleteAd(id: any): Observable<any> {
    return this.http.delete<any>(`/api/ad/${id}/delete`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // toggle ad status
  toggleAdStatus(id: any): Observable<any> {
    return this.http.put<any>(`/api/ad/${id}/adToggle`, {}).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // ********** CITIES MODULE

  // get all cities
  getAllCities(): Observable<any> {
    return this.http.get<any>(`/api/city/get`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // add city
  addCity(value: any): Observable<any> {
    let fd = new FormData();

    fd.append('name', value.name);
    fd.append('description', value.description);

    return this.http.post<any>(`/api/city/create`, fd).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // *********** FEEDBACKS MODULE

  // get all feedbacks
  getAllFeedbacks(): Observable<any> {
    return this.http.get<any>(`/api/feedback/get`).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
