import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient) {
  }

  calculatePrice(productId: number, purchaseQuantity: number): Observable<any> {
    return this.http.get("api/shopping-cart/calculate-price", {headers: {"Content-Type": "application/json"}, params: {productId: productId.toString(), purchaseQuantity: purchaseQuantity.toString()}});
  }
}
