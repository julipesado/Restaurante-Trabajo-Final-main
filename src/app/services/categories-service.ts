import { inject, Injectable, OnInit, signal } from '@angular/core';
import { AuthService } from './auth-service';
import { Category, NewCategory } from '../interfaces/interfaces/categories';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements OnInit{
  ngOnInit(): void{

  }
  authService = inject(AuthService);
  restaurantCategories: Category[] = [];
  userCategories: Category[] = []; 
  userService = inject(UserService);
  selectedCategoryId = signal<number | null>(null);

  async getCategoriesById(restaurantId : number | string) {
    const res = await fetch("https://w370351.ferozo.com/api/categories"  + restaurantId,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      })
    if (!res.ok) {
      return; 
    }
    this.restaurantCategories =  await res.json(); 
    return this.restaurantCategories.length> 0,
      this.restaurantCategories[0], undefined;
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
    if (!res.ok) return;
    const resJson: Category = await res.json();
    this.userCategories.push(resJson);
    return resJson;
  }

  async editCategory(categoriaEditada: Category) {
    const res = await fetch("https://w370351.ferozo.com/api/categories" + "/" + categoriaEditada.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + this.authService.token,
      },
      body: JSON.stringify(categoriaEditada)
    });
    if (!res.ok) return;
    this.userCategories = this.userCategories.map(category => {
      if (category.id === categoriaEditada.id) return categoriaEditada;
      return category 
    })
  }
  
  async deleteCategory(id: string | number) {
    const res = await fetch("https://w370351.ferozo.com/api/categories" + id, {
      method: 'DELETE',
      headers: {
        Authorization: "Bearer " + this.authService.token
      }
    });
    if (!res.ok) return;{
      this.userCategories = this.userCategories.filter(category => category.id !== id)
    }
    return true;
  }

async getCategories(userId: string | number) {
    const res = fetch("https://w370351.ferozo.com/api/users" + userId + "/categories")
      .then(response => response.json())
      .then(data => {
        this.userCategories = data;
        console.log('Categorías cargadas:', data);
      })
      .catch(error => {
        console.log('Error al traer las categorías:', error);
      });
      if (this.userCategories.length > 0) {
        this.selectedCategoryId.set(this.userCategories[0].id);
      }
  }

  selectCategory(categoryId: number) {
    this.selectedCategoryId.set(categoryId);
  }

}

