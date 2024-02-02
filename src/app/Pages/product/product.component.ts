import { JokeApiService } from './../../api/joke-api.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  id!:string;
  product!:any;
  constructor(private jokeApiService:JokeApiService){}
  ngOnInit(){
    this.id = window.location.href.split('/').pop() || '';
    if(this.id != ''){
      this.jokeApiService.someEndPoint='product/'+this.id;
      this.jokeApiService.postSomeData({}).then(
        (res) =>{
          if(res.status===200){
            this.product=res.data;
            //console.log(this.product)
          }
        }
      ).catch(
        (err) => console.log(err)
      );
    }
  }
  getImgUrl(){
    return "assets/Images/"+this.product?.img_url;
  }
  getPrice(){
    return this.product?.price + " " +"DT"

  }
}
