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
}
