import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../services/user-service';
import { AuthService } from '../services/auth-service';
import { User } from '../interfaces/interfaces/user';
import { Product } from '../interfaces/interfaces/product';
import { RouterLink } from "@angular/router";
import { ProductsService } from '../services/products-service';
import { NewProduct } from '../interfaces/interfaces/product';
import { ProductListItem } from '../product-list-item/product-list-item';
import { CategoriesService } from '../services/categories-service';
import { Category } from '../interfaces/interfaces/categories';

@Component({
  selector: 'app-logged-layout',
  imports: [RouterLink, ProductListItem],
  templateUrl: './logged-layout.html',
  styleUrl: './logged-layout.scss',
})
export class LoggedLayout implements OnInit {

  authService = inject(AuthService);
  userService = inject(UserService);
  productService = inject(ProductsService);
  categoriesService= inject (CategoriesService);
  me: User | undefined;
  error = false;

  ngOnInit(): void {
    this.productService.getProductsMe();
    const restaurantName = this.authService.getRestaurantName();
    if (restaurantName === null)
      this.error = true;
    else
      this.userService.getUserByRestaurantName(restaurantName).then(user => {
        this.me = user;
      })
  }
  addCategory(){
    this.categoriesService.createCategory
  }
  editCategory(){
    this.categoriesService.editCategory
  }
  deleteCategory(){
    this.categoriesService.deleteCategory
  }
  
  logOut(){
    this.authService.logout()
  }
}
