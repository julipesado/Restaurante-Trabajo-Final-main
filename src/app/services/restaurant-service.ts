import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth-service";
import id from "@angular/common/locales/id";

@Injectable({
  providedIn: "root"
})
export class RestaurantService {}
   /**  authService=  inject(AuthService)
    Restaurant= inject(RestaurantService)

    favoriteRestaurant (id:number) {
        const restaurantefavorito = localStorage.setItem( this.favoriteRestaurant)
        restaurantefavorito = true
        if (restaurantefavorito){
            return ⭐
        }

    }
  */ 
