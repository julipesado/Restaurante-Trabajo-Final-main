import { Component, inject, input } from '@angular/core';
import { Product } from '../interfaces/interfaces/product';
import { ProductsService } from '../services/products-service';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { Category } from '../interfaces/interfaces/categories';

@Component({
  selector: 'app-product-list-item',
  imports: [RouterLink],
  templateUrl: './product-list-item.html',
  styleUrl: './product-list-item.scss',
})
export class ProductListItem {
  product = input.required<Product>()
  category = input.required<Category>()
  productService = inject(ProductsService)
  router = inject(Router)

  deleteProduct(){
    this.productService.deleteProduct(this.product().id)
  }
}
