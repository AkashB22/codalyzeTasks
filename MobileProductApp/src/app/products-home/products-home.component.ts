import { Component, OnInit } from '@angular/core';
import { ProductsDetailsService } from './../products-details.service';
import {Product} from './../../Model/product'

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit {
  Products : Product[];
  show : boolean = false;
  products: Product[];

  constructor(public productService : ProductsDetailsService) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(
        (data)=>{
          this.products = data;
          this.show=true;
          console.log(this.products);
        },
        (error)=>{
          console.log(error);
        }
      )
  }

}
