import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

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
}
