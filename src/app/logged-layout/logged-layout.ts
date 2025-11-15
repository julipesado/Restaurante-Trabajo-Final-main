import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { AuthService } from '../services/auth-service';
import { User } from '../interfaces/interfaces/user';
import { AddProducts } from '../add-products/add-products';

@Component({
  selector: 'app-logged-layout',
  imports: [],
  templateUrl: './logged-layout.html',
  styleUrl: './logged-layout.scss',
})
export class LoggedLayout implements OnInit {

  authService = inject(AuthService);
  userService = inject(UserService);

  me: User | undefined;
  error = false;

  ngOnInit(): void {
    const restaurantName = this.authService.getRestaurantName();
    if (restaurantName === null)
      this.error = true;
    else
      this.userService.getUserByRestaurantName(restaurantName).then(user => {
        this.me = user;
      })
  }

}
