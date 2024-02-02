import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class JokeApiService {
  private apiUrl = 'http://localhost:3000';
  public someEndPoint = '';
  private headers: HttpHeaders = new HttpHeaders();
  constructor() {}

  getSomeData() {
    return axios.get(`${this.apiUrl}/${this.someEndPoint}`);
  }

  postSomeData(data: any) {
    return axios.post(`${this.apiUrl}/${this.someEndPoint}`, data);
  }
  addAuthorizationHeader(token: string): void {
    // Set the Authorization header with the token
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
