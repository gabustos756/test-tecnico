import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {delay, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  getProductData(productID): Observable<any> {
    return this.http
      .get(endpoint + "productDetail?productID=" + productID)
      .pipe(map(this.extractData));
  }
}

const endpoint = "http://localhost:3000/";