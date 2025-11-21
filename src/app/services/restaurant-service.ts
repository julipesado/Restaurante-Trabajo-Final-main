import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth-service";

@Injectable({
  providedIn: "root"
})
export class RestaurantService {
  authService = inject(AuthService)

  favoriteRestaurant(id: number) {
    localStorage.setItem("resfav-" + id, "true");
  }
  
  unfavoriteRestaurant(id: number) {
    localStorage.setItem("resfav-" + id, "false");
  }

  isFavoriteRestaurant(id: number) {
    const resfav = localStorage.getItem("resfav-" + id);

    if (!resfav)
      return false;

    if (resfav === "true")
      return true;
    else
      return false;
  }
}