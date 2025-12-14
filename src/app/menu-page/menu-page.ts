import { Component, inject } from '@angular/core';
import { ProductsService } from '../services/products-service';
import { Product } from '../interfaces/interfaces/product';

@Component({
  selector: 'app-menu-page',
  imports: [],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss'
})
export class MenuPage {
  productsService = inject(ProductsService); 

  getFinalPrice(product: Product){
    this.productsService.getFinalPrice
  }
}
