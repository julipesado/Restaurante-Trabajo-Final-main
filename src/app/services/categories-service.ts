import { inject, Injectable, OnInit, signal } from '@angular/core';
import { AuthService } from './auth-service';
import { Category, NewCategory } from '../interfaces/interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements OnInit{
  ngOnInit(): void{

  }
  authService = inject(AuthService);
  readonly API_USERS_URL = "https://w370351.ferozo.com/api/Users";
  categories: Category[] = [];



  async getCategoriesById(restaurantId: number) {
    const res = await fetch("https://w370351.ferozo.com/api/Categories" + restaurantId + this.authService.getUserId,
      {
        headers: {
          Authorization: "Bearer" + this.authService.token,
        },
      })
    if (!res.ok) {
      return; 
    }
    return await res.json(); 
  }

  async createCategory(nuevaCategory: NewCategory) {
    const res = await fetch("https://w370351.ferozo.com/api/Categories", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer" + this.authService.token,
      },
      body: JSON.stringify(nuevaCategory)
    });
    if (!res.ok) return;
    const resJson: Category = await res.json();
    this.categories.push(resJson);
    return resJson;
  }

  async editCategory(id: number, categoriaEditada: Category) {
    const res = await fetch("https://w370351.ferozo.com/api/Categories" + "/" + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer" + this.authService.token,
      },
      body: JSON.stringify(categoriaEditada)
    });
    if (!res.ok) return;
    this.categories = this.categories.map(category => {
      if (category.id === categoriaEditada.id) return categoriaEditada;
      return category 
    })
  }
  

  async deleteCategory(id: string | number) {
    const res = await fetch("https://w370351.ferozo.com/api/Categories" + id, {
      method: 'DELETE',
      headers: {
        Authorization: "Bearer" + this.authService.token
      }
    });
    if (!res.ok) return;{
      this.categories = this.categories.filter(category => category.id !== id)
    }
    return true;
  }
}

