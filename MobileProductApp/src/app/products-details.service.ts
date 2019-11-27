import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './../Model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsDetailsService {
  public Product : Product[];

  constructor(private http : HttpClient) { }

  productsUrl: string = 'http://localhost:3000/api/products';
  productUrl: string = 'http://localhost:3000/api/product';

  public getProducts(): Observable<Product[]>{
    return this.http.get<any>(this.productsUrl)
    .pipe(map((arrProduct)=>{
      let data = arrProduct.data;
      return data.map(product => {
        return {
          name: product.name,
          pricingTier: product.pricingTier,
          priceRange: product.priceRange,
          weight: product.weight,
          availability: product.availability,
          productUrl: product.productUrl,
          isEditable: product.isEditable,
          prodName: product.name.replace(/\s/g, '')
        }
      })
    }));
  }

  public addProduct(data): Observable<any>{
    return this.http.post(this.productUrl + '/' + data.name, data.body);
  }

  public updateProduct(data): Observable<any>{
    console.log(data);
    return this.http.put(this.productUrl + '/' + data.name, data.body);
  }

  public getProduct(data): Observable<any>{
    return this.http.get(this.productUrl + '/' + data.name);
  }

  public deleteProducts(data): Observable<any>{
    return this.http.delete(this.productUrl + '/' + data.name);
  }
}
