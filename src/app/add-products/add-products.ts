import { Component, inject, input, OnInit, viewChild } from "@angular/core";
import { AuthService } from "../services/auth-service";
import { ProductsService } from "../services/products-service";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { NewProduct, Product } from "../interfaces/interfaces/product";
import { CategoriesService } from "../services/categories-service";
import { Category } from "../interfaces/interfaces/categories";

@Component({
  selector: 'app-add-products',
  imports: [FormsModule],
  templateUrl: 'add-products.html',
  styleUrl: 'add-products.scss'
})
export class AddProducts implements OnInit {
  authService = inject(AuthService);
  productService = inject(ProductsService);
  router = inject(Router);
  idProducto = input<number>();
  productoOriginal: Product | undefined = undefined;
  form = viewChild<NgForm>('newProductForm');
  isLoading = false; 
  product: Product | undefined;
  categoriesService = inject (CategoriesService)
  categories: Category[] = [];
  restaurantId : number | null = null; 



  async ngOnInit() {
  const id = this.authService.getUserId();
  if (id) {
    this.restaurantId = id;
    this.categories = await this.categoriesService.getCategoriesByRestaurant(this.restaurantId);
  }
    if (this.idProducto()) {
      this.productoOriginal = await this.productService.getRestaurantProducts(this.idProducto()!) //* el ! dsp de la variable significa que esta revisado de que no es undefined 
      this.form()?.setValue({
        name: this.productoOriginal!.name,
        id: this.productoOriginal!.id,
        price: this.productoOriginal!.price,
        description: this.productoOriginal!.description,
        categoryId: this.productoOriginal!.categoryId,
        recommendedFor: this.productoOriginal!.recommendedFor,
        discount: this.productoOriginal!.discount,
        hasHappyHour: this.productoOriginal!.hasHappyHour,
      }) 
    }
  }
  async handleFormSubmission(form: NgForm) {
     const nuevoProducto: NewProduct = {
      name: form.value.name,
      description: form.value.descripcion,
      price: parseInt(form.value.price),
      featured: form.value.featured,
      recommendedFor: parseInt(form.value.recommendedFor),
      discount: parseInt(form.value.discount),
      hasHappyHour: form.value.hasHappyHour,
      categoryId: parseInt(form.value.categoryId),
      restaurantId: this.authService.getUserId(),
    };
    let res;
    this.isLoading = true;
    if (this.idProducto()) {
      res = await this.productService.editProduct({
        ...nuevoProducto,
        id: this.idProducto()!
      });
    } else {
      res = await this.productService.createProduct(nuevoProducto);
    }

    this.isLoading = false;
    this.router.navigate(["/admin"])
    }
  }




