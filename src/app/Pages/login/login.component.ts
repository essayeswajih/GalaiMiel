import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../component/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  msg!:string
  constructor(private authService:AuthService){}
  getPassAndEmailErrorMessage(){
    if (this.email.hasError('email') || this.password.hasError('password')){
        return 'invalid Email or Password';
    }
    return '';
  }
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.password.hasError('password') ? 'Not a valid password' : '';
  }

  async login() {
    if((this.email.valid) && (this.password.valid)){
      const res = await this.authService.login(this.email.value,this.password.value);
      if (res){
        alert("welcome");
        this.authService.checkSession();
        this.authService.setLoggedIn();
        console.log("logged in from login componenet: "+ this.authService.isLoggedIn());
        document.location.href='/';
      }
    }
  }
  
}
