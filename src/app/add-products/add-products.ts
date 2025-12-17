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
  errorBack = false;
  restaurantId : number | null = null; 

  async ngOnInit() {
  const id = this.authService.getUserId();
  if (id) {
    this.restaurantId = id;
    this.categories = await this.categoriesService.getCategoriesByRestaurant(this.restaurantId);
  }
    if (this.idProducto()) {
      this.productoOriginal = await this.productService.getProduct(this.idProducto()!);
      this.form()?.setValue({
        name: this.productoOriginal!.name,
        description: this.productoOriginal!.description,
        price: this.productoOriginal!.price,
        featured: this.productoOriginal!.featured,
        recommendedFor: this.productoOriginal!.recommendedFor,
        descuento: this.productoOriginal!.discount,
        happyhour: this.productoOriginal!.hasHappyHour,
        categoryId: this.productoOriginal!.categoryId,
        

      });
    await this.categoriesService.getCategoriesByRestaurant(this.authService.getUserId());
    }

  }
  async handleFormSubmission(form: NgForm) {
    this.errorBack = false;

    const nuevoProducto: NewProduct = {
      name: form.value.name,
      description: form.value.description,
      price: Number(form.value.price),
      featured: !!form.value.featured,
      discount: Number(form.value.discount ?? 0),
      hasHappyHour: !!form.value.hasHappyHour,
      categoryId: Number(form.value.categoryId),
      restaurantId: this.authService.getUserId()!,
      recommendedFor: form.value.recommendedFor
    };
    let res;

    this.isLoading = true;

    if (this.idProducto()) {
      res = await this.productService.editProduct({...nuevoProducto, id: this.idProducto()!});
    } else {
      res = await this.productService.createProduct(nuevoProducto);
    }

    this.isLoading = false;

    if (!res) {
      this.errorBack = true;
      return;
    };
    this.router.navigate(['/admin']);
  }
}