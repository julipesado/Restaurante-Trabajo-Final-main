import { Component, inject, input, OnInit, signal } from '@angular/core';
import { UserService } from '../services/user-service';
import { ProductsService } from '../services/products-service';
import { User } from '../interfaces/interfaces/user';
import { Category } from '../interfaces/interfaces/categories';
import { RouterLink, Router } from '@angular/router';
import { Product } from '../interfaces/interfaces/product';
import { RestaurantService } from '../services/restaurant-service';
import { CategoriesService } from '../services/categories-service';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.html',
  imports: [RouterLink],
  styleUrls: ['./restaurant-page.scss']
})
export class RestaurantPage implements OnInit {

  // Servicios
  userService = inject(UserService);
  categoriesService = inject(CategoriesService)
  productsService = inject(ProductsService);
  restaurantService = inject(RestaurantService);
  router = inject(Router);

  // Inputs y datos
  idRestaurant = input.required<number>();
  user: User | undefined = undefined;
  categories = this.categoriesService.categories
  selectedCategoryId : number|null = null;

  async ngOnInit(){
     const restaurantId = this.idRestaurant();
    if (restaurantId) {
      this.user = this.userService.users.find(r => r.id === restaurantId);
      if (!this.user) {
        this.user = await this.userService.getUserById(restaurantId);
      }
      await this.productsService.getRestaurantProducts(restaurantId);
      await this.categoriesService.getCategoriesByRestaurant(restaurantId);
      
    this.categories = await this.categoriesService.getCategoriesByRestaurant(restaurantId);
    if (this.categories.length > 0) {
      this.selectedCategoryId = this.categories[0].id;
    }
  }
}
  async toggleFavorite() {
    if (this.user) {

      if (this.restaurantService.isFavoriteRestaurant(this.user.id))
        this.restaurantService.unfavoriteRestaurant(this.user.id);
      else
        this.restaurantService.favoriteRestaurant(this.user.id);

    }
  }

  goToRestaurants() {
    this.router.navigate(['/']);
  }
}
