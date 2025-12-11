import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { Category, NewCategory, UpdateCategoryRequestDto } from '../interfaces/interfaces/categories';
import { AuthService } from '../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { NgForm, FormsModule} from '@angular/forms';
import { CategoriesService } from '../services/categories-service';

@Component({
  selector: 'app-add-categories',
  imports: [FormsModule, RouterLink],
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
      const categorias = this.categoryService.categories();
      this.categoryOriginal = categorias.find(categories => categories.id == this.idCategory()) //* el ! dsp de la variable significa que esta revisado de que no es undefined 
      this.form()?.setValue({
        name: this.categoryOriginal!.name,
        id: this.categoryOriginal!.id
      })
    }
}  
  async handleFormSubmission(form: NgForm){
    const nuevaCategory: NewCategory = {
      name: form.value.name,
      restaurantId:  this.authService.getUserId(),
    }

    let res;
    this.isLoading = true;

    if (this.idCategory()) {
      const updateData: UpdateCategoryRequestDto = {
      name: nuevaCategory.name
    }
      res = await this.categoryService.editCategory( updateData, this.idCategory()!);
    } else {
      res = await this.categoryService.createCategory(nuevaCategory);
    }

    this.isLoading = false;

    this.router.navigate(["/admin"]);
  }

}