import { inject, Injectable, OnInit, signal } from '@angular/core';
import { AuthService } from './auth-service';
import { Category, NewCategory, UpdateCategoryRequestDto } from '../interfaces/interfaces/categories';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements OnInit{
  ngOnInit(): void{

  }
  authService = inject(AuthService);
  categories:  Category[] = [];
  userService = inject(UserService);
  selectedCategoryId : number | null = null;

  async getCategoriesByRestaurant(restaurantId : number) {
    const res = await fetch("https://w370351.ferozo.com/api/users/" + restaurantId + "/categories", 
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      })
    if (!res.ok) {
      return []; 
    }
    const categoriesData = (await res.json()) as Category[];
    return categoriesData;
  }

  async createCategory(nuevaCategory: NewCategory) {
    const res = await fetch("https://w370351.ferozo.com/api/categories", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + this.authService.token,
      },
      body: JSON.stringify(nuevaCategory)
    });
    if (!res.ok) return undefined;
    const newCategory = (await res.json()) as Category;
    this.categories.push(newCategory);
    return newCategory;
  }

  async editCategory(categoriaEditada: Category) {
    const res = await fetch("https://w370351.ferozo.com/api/categories/" + categoriaEditada.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + this.authService.token,
      },
      body: JSON.stringify(categoriaEditada)
    });
     if (!res.ok) return;
    this.categories === this.categories.map(category => {
      if (category.id === categoriaEditada.id) return categoriaEditada;
      return category 
    })
    return categoriaEditada;
  }
  
  async deleteCategory(id: string | number) {
    const res = await fetch("https://w370351.ferozo.com/api/categories/" + id, {
      method: 'DELETE',
      headers: {
        Authorization: "Bearer " + this.authService.token
      }
    });
    if (!res.ok) return;
    if (res.ok) {
      this.categories = this.categories.filter(category => category.id !== id)
    }
    return true 
    }

  selectCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
  }

}

