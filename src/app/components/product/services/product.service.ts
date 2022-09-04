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
import { from, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productRef: AngularFirestoreCollection<IProduct>;
  productOptionRef: AngularFirestoreCollection<IProductOption>;

  constructor(private http: HttpClient, private afs: AngularFirestore) {
    this.productRef = afs.collection('/products', (ref) =>
      ref.orderBy('id', 'asc')
    );
    this.productOptionRef = afs.collection('/productOptions', (ref) =>
      ref.orderBy('order', 'asc')
    );
  }
  getProducts(): Observable<IProduct[]> {
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

  getProductOptions(): Observable<IProductOption[]> {
    return this.productOptionRef.valueChanges({ idField: 'docId' }).pipe(
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
    return from(this.productOptionRef.add(option)).pipe(
      catchError((error) => {
        console.error(
          `%cProductService => addProductOptions ${error}`,
          'color:white; background:red; font-size:20px'
        );
        return of(error);
      })
    );
  }

  updateProductOption(option: IProductOption): Observable<IProductOption> {
    console.log('Update Product Option');
    const docId = option.docId;
    let updateOption = { ...option };
    delete updateOption.docId;

    return from(this.productOptionRef.doc(docId).update(updateOption)).pipe(
      // map(() => {
      //   return this.productOptionRef.valueChanges();
      // }),
      catchError((error) => {
        console.error(
          `%cProductService => update ${error}`,
          'color:white; background:red; font-size:20px'
        );
        return of(error);
      })
    );
  }

  deleteProductOption(delOption: IProductOption): Observable<any> {
    console.log('Delete Product Option');

    const docId = delOption.docId;
    return from(this.productOptionRef.doc(docId).delete()).pipe(
      catchError((error) => {
        console.error(
          `%cProductService => addProductOptions ${error}`,
          'color:white; background:red; font-size:20px'
        );
        return of(error);
      })
    );
  }

  getProductsX() {
    const apiUrl =
      'https://script.google.com/macros/s/AKfycbxmAFfURqZHjLlCicjDvxQYX4L9Vvzmu_RnDkw6LhKO1yD7W166PQYHjksBODxXsby_/exec?action=selects&sheet_name=products';
    return this.http.get<any[]>(apiUrl);
  }

  getProductByIdX(productId: string) {
    const apiUrl =
      'https://script.google.com/macros/s/AKfycbxmAFfURqZHjLlCicjDvxQYX4L9Vvzmu_RnDkw6LhKO1yD7W166PQYHjksBODxXsby_/exec?action=select&sheet_name=member&line_id=' +
      productId;
    return this.http.get<any>(apiUrl);
  }

  getProductOptionsX() {
    const apiUrl =
      'https://script.google.com/macros/s/AKfycbxmAFfURqZHjLlCicjDvxQYX4L9Vvzmu_RnDkw6LhKO1yD7W166PQYHjksBODxXsby_/exec?action=selects&sheet_name=product_options';
    return this.http.get<any>(apiUrl);
  }
}
