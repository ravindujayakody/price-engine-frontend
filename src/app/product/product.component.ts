import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productPriceTable: ProductPriceTable[] = [];
  oneToFiftyQtyLabels = Array(50).fill(1).map((x,i)=>i);

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.productService.priceTable().subscribe(
      response => this.productPriceTable = response,
      error => console.log(error)
    )

  }

}

export class ProductPriceTable {
  product: Product | undefined;
  priceLines: ProductPriceLine[] = [];

  constructor() {}
}

export class Product {
  id: number | undefined;
  name: string | undefined;
  unitsPerCarton: number | undefined;
  cartonPrice: number | undefined;

  constructor() {}
}

export class ProductPriceLine {
  quantity: number | undefined;
  price: number | undefined;

  constructor() {}
}
