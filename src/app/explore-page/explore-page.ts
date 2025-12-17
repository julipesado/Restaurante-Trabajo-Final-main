import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user-service';
import { FormsModule } from '@angular/forms';
import { RestaurantListItem } from '../restaurant-list-item/restaurant-list-item';
import { Spinner } from '../spinner/spinner';


@Component({
  selector: 'app-explore-page',
  imports: [RouterModule, RestaurantListItem, FormsModule, Spinner],
  templateUrl: './explore-page.html',
  styleUrl: './explore-page.scss',
})
export class ExplorePage implements OnInit {
  authService = inject(AuthService);
  userService = inject(UserService);

  isLoading = true;

  async ngOnInit() {
    await this.userService.getUsers();
    this.isLoading = false;
  }

}
