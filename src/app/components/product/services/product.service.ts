import { IProductOption, IProductHistory } from './../models/product.model';
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
    return this.productRef.valueChanges({ idField: 'docId' }).pipe(
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

  addProduct(product: IProduct): Observable<IProduct> {
    console.log('Add Product');
    return from(this.productRef.add(product)).pipe(
      catchError((error) => {
        console.error(
          `%cProductService => addProductOptions ${error}`,
          'color:white; background:red; font-size:20px'
        );
        return of(error);
      })
    );
  }

  // updateProduct(product: IProduct): Observable<IProduct> {
  //   console.log('Update Product');
  //   const docId = product.docId;
  //   let updateProduct = { ...product };
  //   delete updateProduct.docId;

  //   return from(this.productRef.doc(docId).update(updateProduct)).pipe(
  //     catchError((error) => {
  //       console.error(
  //         `%cProductService => updateProduct ${error}`,
  //         'color:white; background:red; font-size:20px'
  //       );
  //       return of(error);
  //     })
  //   );
  // }

  updateProduct(product: IProduct): Observable<IProduct> {
    console.log('Update Product');
    const docId = product.docId;
    let updateProduct = { ...product };
    delete updateProduct.docId;
    delete updateProduct.history;

    const historyData = product.history![0];
    const productHistoryRef = this.productRef.doc(docId).collection('/history');

    return from(this.productRef.doc(docId).update(updateProduct)).pipe(
      switchMap((res) => {
        return from(productHistoryRef.add(historyData)).pipe(
          catchError((error) => {
            console.error(
              `%cProductService => updateProduct ${error}`,
              'color:white; background:red; font-size:20px'
            );
            return of(error);
          })
        );
      })
    );
  }

  addProductHistory(product: IProduct): Observable<IProductHistory> {
    console.log('Add Product History');
    const docId = product.docId;
    const historyData = product.history;

    const productHistoryRef = this.productRef.doc(docId).collection('/history');

    return from(productHistoryRef.add(historyData!)).pipe(
      catchError((error) => {
        console.error(
          `%cProductService => updateProduct ${error}`,
          'color:white; background:red; font-size:20px'
        );
        return of(error);
      })
    );
  }

  deleteProduct(delProduct: IProduct): Observable<any> {
    console.log('Delete Product');

    const docId = delProduct.docId;
    return from(this.productRef.doc(docId).delete()).pipe(
      catchError((error) => {
        console.error(
          `%cProductService => deleteProduct ${error}`,
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
  swapOrderProductOption(
    option1: IProductOption,
    option2: IProductOption
  ): Observable<any> {
    console.log('Swap Product Option');
    const docId1 = option1.docId;
    let updateOption1 = { ...option1 };
    delete updateOption1.docId;

    const docId2 = option2.docId;
    let updateOption2 = { ...option2 };
    delete updateOption2.docId;

    return from(this.productOptionRef.doc(docId1).update(updateOption1)).pipe(
      switchMap(() => this.productOptionRef.doc(docId2).update(updateOption2)),
      catchError((error) => {
        console.error(
          `%cProductService => swap ${error}`,
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
