import { LightService } from './light/lightService/light.service';
import { JokeApiService } from './../api/joke-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInValue!: boolean;
  private id!: number;
  private token !:string;
  private mode !:string;

  constructor(private jokeApiService: JokeApiService , private lightService:LightService) {
    this.checkSession();
  }

  isLoggedIn(): boolean {
    return this.isLoggedInValue;
  }
  setLoggedIn(): void{
    this.isLoggedInValue=true;
  }
  getId(): number {
    return this.id;
  }
  getMode(): string {
    return this.mode=String(localStorage.getItem('mode'));

  }
  setMode(Mode:string): void{
    
  }
  async login(email: string | null, password: string | null): Promise<boolean> {
    this.jokeApiService.someEndPoint = 'login';
    const response = await this.jokeApiService.postSomeData({ email, password });

    if (response.status === 200) {
      this.setSession(response.data);
      this.setLoggedIn();
      this.checkSession();
      return true;
    }

    return false;
  }

  async logout(): Promise<any> {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("mode");
      this.id=-1;
      this.token="";
      console.log("logout done");
      this.checkSession();
      return true;
    } catch (e) {
      console.log("logout error: " + e);
      return false;
    }
  }
  async setSession(data: any): Promise<boolean> {
    try {
      localStorage.setItem("id", data?.id);
      localStorage.setItem("token", data?.token);
      localStorage.setItem('mode',data?.mode);
      console.log("Set session done");
      return true;
    } catch (e) {
      console.log("Set session error: " + e);
      return false;
    }
  }
  async checkSession(): Promise<any> {
    console.log('Checking session...');
    try{
      if(Number(localStorage.getItem('id'))>0){
        this.id =Number(localStorage.getItem('id'));
        this.mode=String(localStorage.getItem('mode'));
        this.token = String(localStorage.getItem('token'));
        this.isLoggedInValue = true;
        console.log('User is logged in:', this.id);
      }
      else{
        this.id =-1;
        this.token = "";
        this.isLoggedInValue = false;
        if(String(localStorage.getItem('mode')).length>1){
          this.mode=String(localStorage.getItem('mode'));
        }
        else{
          localStorage.setItem('mode',"Dark");
        }
        console.log('User not logged in:', this.id);
      }

    }
    catch(e){
      this.isLoggedInValue = false;
      this.id = -1;
      this.token = "";
      console.log('User is not logged in.');
    }
    console.log('isLoggedInValue:', this.isLoggedInValue);
  }
}
