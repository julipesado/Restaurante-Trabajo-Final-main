import { Component, inject, input, OnInit, viewChild } from "@angular/core";
import { AuthService } from "../services/auth-service";
import { ProductsService } from "../services/products-service";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { NewProduct, Product } from "../interfaces/interfaces/product";

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


  async ngOnInit() {
    if (this.idProducto()) {
      this.productoOriginal = await this.productService.getProductsById(this.idProducto()!) //* el ! dsp de la variable significa que esta revisado de que no es undefined 
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
  async handleFormSubmission(newProduct: NewProduct) {
    let res;
    this.isLoading= true
    if (this.idProducto()) {
      res = await this.productService.editProduct({ ...newProduct, id: this.idProducto()!});
    } else {
      res = await this.productService.createProduct(newProduct);
    }
    this.isLoading = false;
    this.router.navigate(["/"])
    }
  }




