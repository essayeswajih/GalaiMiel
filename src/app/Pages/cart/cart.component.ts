import { Component, OnInit } from '@angular/core';
import { CartProduitComponent } from 'src/app/component/cart-produit/cart-produit.component';
import { JokeApiService } from './../../api/joke-api.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Produit[]=[];
  Total=0;
  constructor(private JokeApiService:JokeApiService) { }

  ngOnInit(): void {
    // Access or modify cart data using this.cartService
    if(!localStorage.getItem('id')){
      document.location.href='/';
    }
    this.cartItems = [];
    this.Total=0;

    this.JokeApiService.someEndPoint = "product/all";
    this.JokeApiService.postSomeData({}).then(
      (data) => {
        if (data.status == 200) {
          let data1: any = data.data.data;
          for (let index = 0; index < data1.length; index++) {
            let item = {
              'id': Number(data1[index].id),
              'category': data1[index].category,
              'name': data1[index].name,
              'desc': '',
              'prix': Number(data1[index].price)
            };
            this.cartItems.push(item);
          }
          this.Total = this.getTotal();
        }
      }
    ).catch(
      (err) => console.log('Error', err)
    );

  }
  getTotal(){
    for(let x of this.cartItems){
      this.Total+=x.prix;
    }
    return this.Total;
  }
}
interface Produit{
  id : number,
  category:string,
  name:string,
  desc:string,
  prix:number,
}