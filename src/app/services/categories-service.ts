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
  categories =  signal<Category[]>([]);
  userService = inject(UserService);
  selectedCategoryId = signal<number | null>(null);

  async getCategoriesByRestaurant(restaurantId : number) {
    const res = await fetch("https://w370351.ferozo.com/api/categories"  + restaurantId,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      })
    if (!res.ok) {
      this.categories.set([]);
      return; 
    }
    const categoriesData = (await res.json()) as Category[];
    this.categories.set(categoriesData);
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
    this.categories.update(current => [...current, newCategory]);
    return newCategory;
  }

  async editCategory(categoriaEditada: UpdateCategoryRequestDto, id:number) {
    const res = await fetch("https://w370351.ferozo.com/api/categories" + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + this.authService.token,
      },
      body: JSON.stringify(categoriaEditada)
    });
     if (!res.ok) return undefined;
    const editedCategory = (await res.json()) as Category;

    this.categories.update(currentCategories =>
      currentCategories.map(cat =>
        cat.id === id ? editedCategory : cat
      )
    );
      return editedCategory;
  }
  
  async deleteCategory(id: string | number) {
    const res = await fetch("https://w370351.ferozo.com/api/categories" + id, {
      method: 'DELETE',
      headers: {
        Authorization: "Bearer " + this.authService.token
      }
    });
    if (!res.ok) return false;
    this.categories.update(currentCategories =>
      currentCategories.filter(cat => cat.id !== id)
    )
      return true; 
    }

  selectCategory(categoryId: number) {
    this.selectedCategoryId.set(categoryId);
  }

}

