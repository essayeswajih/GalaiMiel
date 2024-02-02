import { Component } from '@angular/core';
import { AuthService } from 'src/app/component/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(private authService:AuthService){}
  ngOnInit(){
    
  }
  logout(){
    console.log('logout now');
    this.authService.logout();
    document.location.href='/';
  }
}
