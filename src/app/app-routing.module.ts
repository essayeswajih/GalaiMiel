import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { AcceuilComponent } from './Pages/acceuil/acceuil.component';
import { CartComponent } from './Pages/cart/cart.component';
import { SigninComponent } from './Pages/signin/signin.component';
import { LogoutComponent } from './Pages/logout/logout.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { ProductComponent } from './Pages/product/product.component';

const routes: Routes = [
  {
    path:"",
    component:AcceuilComponent
  },
  {
    path:"Login",
    component:LoginComponent
  }
  ,
  {
    path:"Promos",
    component:LoginComponent
  }
  ,
  {
    path:"cart",
    component:CartComponent
  }
  ,
  {
    path:"Contact",
    component:ContactComponent
  }
  ,
  {
    path:"SignIn",
    component:SigninComponent
  }
  ,
  {
    path:"Logout",
    component:LogoutComponent
  }
  ,
  {
    path:"Profile",
    component:ProfileComponent
  }
  ,
  {
    path:"Product/:id",
    component:ProductComponent
  }
  ,
  {
    path:":data",
    component:AcceuilComponent
  }
  ,
  {
    path:":data/Product/:id",
    component:ProductComponent
  }
  ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
