import { Component, inject, input, OnInit } from '@angular/core';
import { ProductsService } from '../services/products-service';
import { Product } from '../interfaces/interfaces/product';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss'
})
export class ProductPage implements OnInit {
  idProduct = input.required<string>();
  product: Product | undefined;
  productsService = inject(ProductsService); 

  async ngOnInit() {
    this.product = await this.productsService.getProduct(parseInt(this.idProduct()));
  }
}
