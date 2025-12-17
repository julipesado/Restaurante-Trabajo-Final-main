import { Injectable, inject } from "@angular/core";
import { NewUser, UpdateUser } from "../interfaces/interfaces/user";
import { User } from "../interfaces/interfaces/user";
import { AuthService } from "./auth-service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService {
  authService = inject(AuthService);
  router = inject(Router);
  aleatorio = Math.random()

  users: User[] = [];
  user: UpdateUser[] = [];

  async register(registerData: NewUser) {
    return await fetch("https://w370351.ferozo.com/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(registerData)
    });

  }
  async getUsers() {
    const res = await fetch("https://w370351.ferozo.com/api/users",
      {
        method: "GET", 
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }

      }
    )
    const resJson: User[] = await res.json()
    this.users = resJson;
  }
  async getUserById(id: number) {
    const res = await fetch('https://w370351.ferozo.com/api/users/' + id,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      })
    if (!res.ok) {
      return
    }
    return await res.json();
  }

  async getUserByRestaurantName(restaurantName: string) {
    if (this.users.length == 0)
      await this.getUsers();

    return this.users.find(u => u.restaurantName === restaurantName);
  }

  async createUser(nuevoUsuario: NewUser) {
    const res = await fetch("https://w370351.ferozo.com/api/users",
      {
        method: "POST",
        body: JSON.stringify(nuevoUsuario),
        headers: {
          "Content-Type": "application/json", Authorization: "Bearer " + this.authService.token,
        },
      })
    if (!res.ok) {
      return
    }
    const resJson: User = await res.json()
    this.users.push(resJson);
    return resJson
  }
 async editUser(userEditado: User) {
    const res = await fetch("https://w370351.ferozo.com/api/users/" + userEditado.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`,
      },
      body: JSON.stringify(userEditado)
    });
    if (!res.ok) {
      return; 
    }
    this.users = this.users.map(user => {
      if (user.id === userEditado.id) {
        return userEditado;
      };
      return user;
    });
    return userEditado;
  }

  async deleteMyself() {
    const id = this.authService.getUserId();
    const res = await fetch("https://w370351.ferozo.com/api/users/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + this.authService.token
      }
    });
    if (!res.ok) return;
    this.users = this.users.filter(user => user.id !== id);
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
  
}
