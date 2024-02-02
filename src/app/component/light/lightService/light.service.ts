import { Injectable } from '@angular/core';
import { JokeApiService } from '../../../api/joke-api.service';

@Injectable({
  providedIn: 'root'
})
export class LightService {
  userId!: number;
  mode!: string;
  nextMode!: string;

  constructor(private jokeApiService: JokeApiService) {
    console.log('this.userId:', this.userId);
    if (localStorage.getItem("id") && localStorage.getItem("mode")){
      this.userId=Number(localStorage.getItem("id"));
      this.mode=String(localStorage.getItem("mode"));
    }
    if (this.userId > 0) {
      this.getDesignMode().then(()=>console.log(this.mode)).catch(()=>this.mode = 'Dark');
    } else {
      this.mode = 'Dark';
    }

    this.nextMode = this.mode === 'Dark' ? 'Light' : 'Dark';
    console.log(this.mode);
  }

  async getDesignMode(): Promise<void> {
    this.jokeApiService.someEndPoint = 'design/get/mode';
    if(!this.userId){
      this.userId=-1
    }
    const postData = {
      userId: this.userId.toString(),
    };

    try {
      const response = await this.jokeApiService.postSomeData(postData);

      if (response.status === 200) {
        this.mode = response.data?.mode;
      }
    } catch (error) {
      this.mode = 'Dark';
    }
  }
  public getMode():string{
    return this.mode
  }
  async setDesignMode(mode: string): Promise<boolean> {
    if(!localStorage.getItem("id")){  
      this.mode= this.mode=="Dark" ? "Light": "Dark";
      console.log("cant");
    }
    else{
      try {
        this.jokeApiService.someEndPoint = 'design/set/mode';
        const postData = {
          userId: localStorage.getItem("id"),
          newDesignMode: mode,
        };
  
        const response = await this.jokeApiService.postSomeData(postData);
  
        if (response.status === 200) {
          console.log('Design mode changed successfully');
          localStorage.setItem("mode",postData.newDesignMode);
          return true;
        } else {
          console.log('Failed to change design mode');
          return false;
        }
      } catch (error) {
        console.error('Error changing design mode:', error);
        return false;
      }
      
    }
    return true
  }
}
