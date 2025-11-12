import { Component } from '@angular/core';
import { Product } from '../interfaces/interfaces/product';
@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  product: Product;

}
