import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SearchResultsService {
  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getSearchResults(searchField): Observable<any> {
    return this.http
      .get(endpoint + "results?search=" + searchField)
      .pipe(map(this.extractData));
  }
  getProductData(productID): Observable<any> {
    return this.http
      .get(endpoint + "productDetail?productID=" + productID)
      .pipe(map(this.extractData));
  }
}

const endpoint = "http://localhost:3000/";
