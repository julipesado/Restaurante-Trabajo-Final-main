import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth-service";
import id from "@angular/common/locales/id";

@Injectable({
  providedIn: "root"
})
export class RestaurantService {}
    /*authService = inject(AuthService)

    favoriteRestaurant () {
        const restaurantefavorito = localStorage.setItem("res-" + id + "-fav", "true")
        restaurantefavorito = true
        if (restaurantefavorito){
            return ⭐
        }

    }*/
