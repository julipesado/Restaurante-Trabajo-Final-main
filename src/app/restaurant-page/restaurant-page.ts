import { Component, inject, input, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { ProductsService } from '../services/products-service';
import { User } from '../interfaces/interfaces/user';
import { Categories } from '../categories/categories';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.html',
  imports: [RouterLink],
  styleUrls: ['./restaurant-page.scss']
})
export class RestaurantPage implements OnInit {
  userService = inject(UserService);
  id = input.required<number>();
  user: User | undefined = undefined;
  categories: Categories[] = [];
  productsService = inject(ProductsService);

  async ngOnInit() {
    this.user = await this.userService.getUserById(this.id());

    const userId = localStorage.getItem('userId'); 

    if (userId) {
      this.getCategories(userId);
    }

    await this.productsService.getProductsByUserId(this.id());
  }

  getCategories(userId: string | number) {
    fetch(`https://restaurant-api.somee.com/api/users/${userId}/categories`)
      .then(response => response.json())
      .then(data => {
        this.categories = data;
        console.log('Categorías cargadas:', data);
      })
      .catch(error => {
        console.log('Error al traer las categorías:', error);
      });
  }

  async toggleFavorite() {
    if (this.user) {
      this.user.isFavourite = !this.user.isFavourite;
    }
  }
}
