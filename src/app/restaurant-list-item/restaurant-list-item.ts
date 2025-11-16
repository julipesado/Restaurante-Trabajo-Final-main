import { Component, inject, input } from '@angular/core';
import { User } from '../interfaces/interfaces/user';
import { UserService } from '../services/user-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-restaurant-list-item',
  imports: [RouterModule],
  templateUrl: './restaurant-list-item.html',
  styleUrl: './restaurant-list-item.scss'
})
export class RestaurantListItem {

  user= input.required<User>()
  aleatorio = Math.random()
  userService = inject(UserService)
  router = inject(Router)

}