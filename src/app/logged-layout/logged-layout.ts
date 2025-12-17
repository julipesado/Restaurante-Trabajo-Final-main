import { Component, inject, input, OnInit } from '@angular/core';
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
  products: Product[] = [];
  categories: Category[] = [];

  async ngOnInit() {
  try {
    const userId = this.authService.getUserId();

    if (userId) {
      this.me = await this.userService.getUserById(userId);
      console.log("Usuario cargado:", this.me);

      this.products = await this.productService.getProductsMe();

      this.categories = await this.categoriesService.getCategoriesByRestaurant(userId);
      console.log(this.products,this.categories)
    } else {
      console.error("No hay usuario logueado o el token expiró");
      this.error = true;
      this.authService.logout();
    }
  } catch (error) {
    console.error("Error cargando datos del panel:", error);
    this.error = true;
  }
}
categoryOf(product: Product) {
  return this.categories.find(category => category.id === product.categoryId)!;
}
//   getProductsByCategory(categoryId: number): Product[] {
//   return this.products.filter(p => {
//     return p.categoryId == categoryId;
//   });
// }
  addCategory(){
    this.categoriesService.createCategory
  }
  editCategory(){
    this.categoriesService.editCategory
  }
  deleteCategory(){
    this.categoriesService.deleteCategory
  }
  addProduct(){
    this.productService.createProduct
  }
  deleteProduct(){
    this.productService.deleteProduct
  }
  editProduct(){
    this.productService.editProduct
  }

  logOut(){
    this.authService.logout()
  }
  deleteAccount(){
    this.userService.deleteMyself()
  }
  editAccount(){
    this.userService.editUser
  }



  productosExamen = [
    {
      categoria:1,
      nombre: "pizza"
    },
    {
      categoria:1,
      nombre: "pizza 2"
    },
    {
      categoria:2,
      nombre: "hamburguesa"
    },

  ]

  categoriasExamen = [1,2]
}
