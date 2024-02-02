import { Component, Input , OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-produit',
  templateUrl: './cart-produit.component.html',
  styleUrls: ['./cart-produit.component.scss']
})
export class CartProduitComponent implements OnInit {
  @Input() row?: Produit;
  constructor(){
  }
  ngOnInit(): void {
  }
}
interface Produit{
  id : number,
  category:string,
  name:string,
  desc:string,
  prix:number,
}
