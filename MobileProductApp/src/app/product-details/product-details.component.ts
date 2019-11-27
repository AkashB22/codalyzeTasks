import { Component, OnInit, Input } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { ProductsDetailsService } from './../products-details.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  radioItems : string[];
  prodName : string;
  product : any;
  message : string;

  constructor(public activatedRoute : ActivatedRoute, public productService: ProductsDetailsService, public router:Router) {
    this.radioItems = ['budget', 'premier'];
   }

  ngOnInit() {
    this.prodName = this.activatedRoute.snapshot.paramMap.get('prodName');
    console.log(this.prodName);

    this.productService.getProduct({name :this.prodName})
      .subscribe(
        (data)=>{
          console.log(data);
          this.product = data.data;
        },
        (error)=>{
          console.log(error);
        }
      )
  }

  onSubmit(){
    console.log(this.product);
    this.productService.updateProduct({name : this.prodName, body : this.product})
      .subscribe(
        (data)=>{
          console.log(data);
          this.message = data.data;
        },
        (error)=>{
          console.log(error);
        }
        );
    setTimeout(()=>{
      this.router.navigate(['']);
    }, 1000)
  }
  
}
