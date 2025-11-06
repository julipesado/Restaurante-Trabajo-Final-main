import { Component, inject, input, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { User } from '../interfaces/interfaces/user';
import { Categories } from '../categories/categories';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.html',
  styleUrls: ['./restaurant-page.scss']
})
export class RestaurantPage implements OnInit {
  userService = inject(UserService);
  id = input.required<number>();
  user: User | undefined = undefined;
  categories: Categories[] = []; 

  async ngOnInit() {
    this.user = await this.userService.getUserById(this.id());

    const userId = localStorage.getItem('userId'); 

    if (userId) {
      this.getCategories(userId);
    }
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
