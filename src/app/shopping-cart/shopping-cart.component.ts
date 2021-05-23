import { Component, OnInit } from '@angular/core';
import {Product} from "../product/product.component";
import {ProductService} from "../services/product.service";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  products: Product[] = [];
  cartProducts: CartProduct[] = [];


  private cartProductTotalSubject$: BehaviorSubject<number> = new BehaviorSubject(0.00);
  readonly cartProductTotal$: Observable<number> = this.cartProductTotalSubject$.asObservable();

  constructor(private productService: ProductService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {

    this.productService.list().subscribe(
      response => this.products = response,
      error => console.log(error)
    )

  }

  calculatePrice(cartProduct: CartProduct){
    if (cartProduct.product && cartProduct.product.id && cartProduct.purchaseQuantity){
      this.shoppingCartService.calculatePrice(cartProduct.product.id, cartProduct.purchaseQuantity).subscribe(
        response => {
          cartProduct.price = response;
          this.totalCalculation();
        }
      )
    } else {
      cartProduct.price = 0.00;
      this.totalCalculation();
    }
  }

  totalCalculation(){
    let total: number = 0.00;
    this.cartProducts.forEach(
      cartProduct => {
        total += cartProduct.price ? cartProduct.price : 0.00;
      }
    );
    this.cartProductTotalSubject$.next(total);
  }

  addToCart(product: Product) {
    if (this.cartProducts.findIndex(x => x.product.id == product.id)) {
      this.cartProducts.push(new CartProduct(product))
    }
  }

}

export class CartProduct {
  product: Product;
  purchaseQuantity: number | undefined;
  price: number | undefined;

  constructor(product: Product) {
    this.product = product;
  }

}
