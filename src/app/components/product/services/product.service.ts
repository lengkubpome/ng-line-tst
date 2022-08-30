import { IProductOption } from './../models/product.model';
import { catchError, switchMap, map } from 'rxjs/operators';
import { IProduct } from 'app/components/product/models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productRef: AngularFirestoreCollection<IProduct>;
  productOptionRef: AngularFirestoreCollection<IProductOption>;

  constructor(private http: HttpClient, private afs: AngularFirestore) {
    this.productRef = afs.collection('/products');
    this.productOptionRef = afs.collection('/productOptions');
  }

  // getProducts(): Observable<IProduct[]> {
  // 	return this.http.get<IProduct[]>('assets/data/product-dummy.json');
  // }

  getProducts2(): Observable<IProduct[]> {
    return this.productRef.valueChanges().pipe(
      catchError((error) => {
        console.error(
          `%cProductService => getProducts ${error}`,
          'color:white; background:red; font-size:20px'
        );
        return of(error);
      })
    );
  }

  getProductOptions2(): Observable<IProductOption[]> {
    return this.productOptionRef.valueChanges().pipe(
      catchError((error) => {
        console.error(
          `%cProductService => getProductOptions ${error}`,
          'color:white; background:red; font-size:20px'
        );
        return of(error);
      })
    );
  }

  addProductOption(option: IProductOption): Observable<IProductOption> {
    console.log('Add Product Option');
    // this.productOptionRef.add(option);
    return from(this.productOptionRef.add(option)).pipe(
      switchMap((docRef) => {
        return this.productOptionRef.valueChanges();
      }),
      catchError((error) => {
        console.error(
          `%cProductService => addProductOptions ${error}`,
          'color:white; background:red; font-size:20px'
        );
        return of(error);
      })
    );
  }

  getProducts() {
    const apiUrl =
      'https://script.google.com/macros/s/AKfycbxmAFfURqZHjLlCicjDvxQYX4L9Vvzmu_RnDkw6LhKO1yD7W166PQYHjksBODxXsby_/exec?action=selects&sheet_name=products';
    return this.http.get<any[]>(apiUrl);
  }

  getProductById(productId: string) {
    const apiUrl =
      'https://script.google.com/macros/s/AKfycbxmAFfURqZHjLlCicjDvxQYX4L9Vvzmu_RnDkw6LhKO1yD7W166PQYHjksBODxXsby_/exec?action=select&sheet_name=member&line_id=' +
      productId;
    return this.http.get<any>(apiUrl);
  }

  getProductOptions() {
    const apiUrl =
      'https://script.google.com/macros/s/AKfycbxmAFfURqZHjLlCicjDvxQYX4L9Vvzmu_RnDkw6LhKO1yD7W166PQYHjksBODxXsby_/exec?action=selects&sheet_name=product_options';
    return this.http.get<any>(apiUrl);
  }
}
