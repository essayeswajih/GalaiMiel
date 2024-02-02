import { JokeApiService } from './../../api/joke-api.service';
import { ActivatedRoute } from '@angular/router';
import {  Router, NavigationEnd } from '@angular/router';
import { Component } from '@angular/core';
import * as aos from 'aos';



@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent {
  data!:any;
  allProducts!:any;
  navArray!:any;
  constructor(private route:ActivatedRoute, private jokeApiService:JokeApiService,private router: Router){}
  
  ngOnInit() {
    aos.init();
    this.data=this.route.snapshot.paramMap.get('data');
    console.log("data:"+this.data);
    this.navArray=this.getNavArray();
    switch(this.data){
      case "":this.setAllProducts(); break;
      case "Sports":this.setProducts(this.filtre(this.data)); break;
      case "Honey_taste":this.setProducts(this.filtre(this.data)); break;
      case "Mixture_of_honey":this.setProducts(this.filtre(this.data)); break;
      default : this.setAllProducts();
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.refreshComponent();
      }
    });
    
  }
  setAllProducts():void{
    this.jokeApiService.someEndPoint="product/all";
    this.jokeApiService.postSomeData({}).then(
      (result)=>{
        if(result.status==200){
          this.allProducts = result.data.data;
          console.log( this.allProducts);
        }
      }
    ).catch((err)=>console.log(err));
  }
  setProducts(data:string):void{
    this.jokeApiService.someEndPoint="products/searchByCategory";
    this.jokeApiService.postSomeData({"category":data}).then(
      (result)=>{
        if(result.status==200){
          this.allProducts = result.data;
          console.log( this.allProducts);
        }
      }
    ).catch((err)=>console.log(err));
  }
  getNavArray(){
    return {
      "categories": [
        {
          "name": "All",
          "className": "l11",
          "subcategories": {},
          "elm": []
        },
        {
          "name": "Sports",
          "className": "l21",
          "subcategories": {
            "className": "u21"
          },
          "elm": [
            { "name": "oats" },
            { "name": "Energy bomb" },
            { "name": "Peanuts" }
          ]
        },
        {
          "name": "Honey taste",
          "className": "l23",
          "subcategories": {
            "className": "u23"
          },
          "elm": [
            { "name": "Spicy honey" },
            { "name": "Orange honey" },
            { "name": "Eucalyptus honey" }
          ]
        },
        {
          "name": "Mixture of honey",
          "className": "l22",
          "subcategories": {
            "className": "u22"
          },
          "elm": [
            { "name": "honey with dried fruits" },
            { "name": "Honey with pistachio" },
            { "name": "Honey with walnuts" },
            { "name": "Psica Whole wheat" },
            { "name": "Pcisa dried fruit" },
            { "name": "Pcisa droa" }
          ]
        }
      ]
    }
  }
  getUrl(x:string):any{
    let x1="";
    for(let i of x){
      (i!==' ') ? x1 += i : x1 += '_' ; 
    }
   return "/" + x1;    
  }
  filtre(x:string | any):any{
    if(x){
      let x1="";
      for(let i of x){
        (i!=='_') ? x1 += i : x1 += ' ' ; 
      }
     return x1; 
    }
   return null
  }
  navigateToUrl(categoryName: string): void {
    const url = this.getUrl(categoryName);

    this.router.navigateByUrl(url, { replaceUrl: true });
  }
  refreshComponent() {
    this.data=this.route.snapshot.paramMap.get('data');
    console.log("data: "+this.data);
    this.navArray=this.getNavArray();
    switch(this.data){
      case "":this.setAllProducts(); break;
      case "Sports":this.setProducts(this.filtre(this.data)); break;
      case "Honey_taste":this.setProducts(this.filtre(this.data)); break;
      case "Mixture_of_honey":this.setProducts(this.filtre(this.data)); break;
      default : this.setAllProducts();
    }
  }
}
