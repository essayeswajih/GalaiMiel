import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './Pages/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from './Pages/contact/contact.component';
import { ContactListComponent } from './component/contact-list/contact-list.component';
import { AcceuilComponent } from './Pages/acceuil/acceuil.component';
import { ProduitComponent } from './component/produit/produit.component';
import { LightComponent } from './component/light/light.component';
import { CartComponent } from './Pages/cart/cart.component';
import { CartProduitComponent } from './component/cart-produit/cart-produit.component';
import axios from 'axios';
import { SigninComponent } from './Pages/signin/signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrMsgComponent } from './component/err-msg/err-msg.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from './component/auth.service';
import { LogoutComponent } from './Pages/logout/logout.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { ProductComponent } from './Pages/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ContactComponent,
    ContactListComponent,
    AcceuilComponent,
    ProduitComponent,
    LightComponent,
    CartComponent,
    CartProduitComponent,
    SigninComponent,
    ErrMsgComponent,
    LogoutComponent,
    ProfileComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
