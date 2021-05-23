import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get("api/product", {headers: {"Content-Type": "application/json"}});
  }

  priceTable(): Observable<any> {
    return this.http.get("api/product/price-table", {headers: {"Content-Type": "application/json"}});
  }
}
