import { JokeApiService } from './../../api/joke-api.service';
import { Injectable, OnInit } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems : Produit[]=[];

  constructor(private JokeApiService:JokeApiService) {

    this.cartItems=[
      {
        id : 1,
        category:"x",
        name :"honey with dried fruits",
        desc:"categorydsqfdd sqdqs",
        prix:150
      }
      ,
      {
        id : 2,
        category:"y",
        name :"honey ",
        desc:"categorydsqd qsdsdq",
        prix:300
      }
      ,
      {
        id : 1,
        category:"z",
        name :"honey fruits",
        desc:"category ds sdqsd",
        prix:50
      }
    ];
   }
   OnInit(){
    if(!localStorage.getItem('id')){
      document.location.href='/';
    }
    this.JokeApiService.someEndPoint="product/all";
    this.JokeApiService.postSomeData({}).then(
      data=>console.log('DATA',data.data)
    ).catch(
      err=>console.log('Error',err)
    );
   }
}
interface Produit{
  id : number,
  category:string,
  name:string,
  desc:string,
  prix:number,
}
