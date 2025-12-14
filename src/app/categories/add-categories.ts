import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { Category, NewCategory, UpdateCategoryRequestDto } from '../interfaces/interfaces/categories';
import { AuthService } from '../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { NgForm, FormsModule} from '@angular/forms';
import { CategoriesService } from '../services/categories-service';

@Component({
  selector: 'app-add-categories',
  imports: [FormsModule],
  templateUrl: 'add-categories.html',
})
export class AddCategories implements OnInit{
  authService = inject(AuthService)
  categoryService = inject(CategoriesService)
  router=inject(Router)
  idCategory = input<number>();   
  categoryOriginal: Category | undefined = undefined; 
  form = viewChild<NgForm>(`newCategoryForm`);
  isLoading = false;  
  restaurantId =  this.authService.getUserId();

async ngOnInit() {
    if (this.idCategory()) {
      const categorias = this.categoryService.categories;
      this.categoryOriginal = categorias.find(categories => categories.id == this.idCategory()) //* el ! dsp de la variable significa que esta revisado de que no es undefined 
    setTimeout(() => {
        if (this.form()) {
            this.form()?.setValue({
              name: this.categoryOriginal!.name
          });
        }
    });
  } 
}
  async handleFormSubmission(newCategory: NewCategory){
    let res;
    this.isLoading = true;
    if (this.idCategory()){
      res = await this.categoryService.editCategory({...newCategory, id: this.idCategory()!});
    } else {
      res = await this.categoryService.createCategory(newCategory);
    }

    this.isLoading = false;

    this.router.navigate(["/admin"]);
  }

}