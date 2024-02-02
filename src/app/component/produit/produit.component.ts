import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent {
@Input() product:any;
  constructor(private router:Router) {}
  ngOnInit(){
    //console.log(this.product);
  }
  getImgUrl(){
    return "assets/Images/"+this.product?.img_url;
  }
  getPrice(){
    return this.product?.price + " " +"DT"

  }
  navigateToProduct(id: number): void {
    try{
      this.router.navigate(['Product', id]);
    }
    catch(e){
      console.log(e)
      document.location.href="Product/"+this.product?.id;
    }
  }
}
