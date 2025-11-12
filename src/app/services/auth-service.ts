import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../interfaces/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged: boolean = false;
  router = inject(Router);
  token: null | string = localStorage.getItem("token");

  async login(loginData: LoginData) {
    const res = await fetch("https://w370351.ferozo.com/api/Authentication/login",
      {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      })
    if (res.ok) {
      this.token = (await res.json()).token as string;
      localStorage.setItem("token", this.token);
      localStorage.setItem("restaurantName", loginData.restaurantName);
      this.router.navigate(["/admin"])
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("restaurantName");
    this.router.navigate(["/login"])
  }

  getRestaurantName() {
    return localStorage.getItem("restaurantName");
  }
  
  getUserId() {
    const claims = this.parseJwt();
    return parseInt(claims.sub);
  }
  
  parseJwt() {
    if (!this.token) return null;
    const base64Url = this.token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
}

