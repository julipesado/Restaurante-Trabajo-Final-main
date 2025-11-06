import { Component, OnInit } from '@angular/core';
import { Category } from '../interfaces/interfaces/categories';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
})
export class Categories implements OnInit {

  categories: any[] = [];
  name: Category | undefined;

  async ngOnInit() {
    const userId = localStorage.getItem('userId'); 
    const response = await fetch(`https://restaurant-api.somee.com/api/users/${userId}/categories`);
    this.categories = await response.json();
  }
}

