import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../interfaces/interfaces/user';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-restaurant-page',
  imports: [RouterModule],
  templateUrl: './restaurant-page.html',
  styleUrl: './restaurant-page.scss',
})
export class RestaurantPage {
userService = inject (UserService)
id = input.required<number>();
user: User | undefined = undefined;
async ngOnInit (){
  this.user = await this.userService.getUserById(this.id()!)
}
async toggleFavorite(){
  if (this.user){
   this.user.isFavourite = !this.user.isFavourite;
   //localStorage.setItem hacer un servicio para poder llamar this.toggleFavouriteUser como servicio 
  }
}
}
