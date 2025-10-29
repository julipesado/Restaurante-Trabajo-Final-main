import { Injectable, inject } from "@angular/core";
import { NewUser } from "../interfaces/interfaces/user";
import { User } from "../interfaces/interfaces/user";
import { AuthService } from "./auth-service";

@Injectable({
    providedIn: "root"
})
export class UserService {
    authService = inject(AuthService)
    aleatorio = Math.random()

    users: User[] = []

    async register(registerData:NewUser){
       return await fetch("", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerData)
        });

    }   
async getUsers(){
    const res = await fetch ("",
        {
            headers:{
                Authorization: "Bearer " + this.authService.token,
            }

        }
    )
    const resJson: User[] =  await res.json()
    this.users = resJson;
}
async getUserById(id: number) {
      const res = await fetch('' + id,
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

  async createUser(nuevoUsuario: NewUser) {
    const res = await fetch("",
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
async editUser(usuarioEditado: User) {
    const res = await fetch("" + "/" + usuarioEditado.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.token,
      },
      body: JSON.stringify(usuarioEditado),
    });
    if (!res.ok) return; 
    this.users = this.users.map(user => {
      if (user.id === usuarioEditado.id) return usuarioEditado;
      return user
    })
    return usuarioEditado;
  }

  async deleteUser(id: number | string) {
    const res = await fetch("" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + this.authService.token
      }
    });
    if(!res.ok) return; 
    if (res.ok) {
      this.users = this.users.filter(user => user.id !== id) 
    return true; 
  }
 async setFavourite(id: string | number) {
    const res = await fetch("" + "/" + id + "/favorite",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      });
    if (!res.ok) {
      return
    }
    this.users = this.users.map(user => { 
      if(user.id === id){
        return {...user, isFavorite: !user.isFavourite};
      };
      return user; 
    });
    return true;
  }
}
}