import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:3001/api/users';
  private axiosInstance: AxiosInstance;
  private loggedIn = false; // Variable to manage authentication state
  private user: any; // Property to store user data

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl
    });
  }

  async register(user: any): Promise<any> {
    return this.axiosInstance.post('/register', user);
  }

  async login(credentials: any): Promise<any> {
    const response = await this.axiosInstance.post('/login', credentials);
    this.loggedIn = true;
    this.user = response.data.user; // Store user data after login
    return response;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
    this.user = null; // Clear user data on logout
  }

  getUser(): any {
    return this.user; // Return user data
  }
}
