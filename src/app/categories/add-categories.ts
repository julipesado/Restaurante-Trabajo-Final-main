import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { Category, NewCategory } from '../interfaces/interfaces/categories';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
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

async ngOnInit() {
    if (this.idCategory()) {
      this.categoryOriginal = await this.categoryService.getCategoriesById(this.idCategory()!) //* el ! dsp de la variable significa que esta revisado de que no es undefined 
      this.form()?.setValue({
        name: this.categoryOriginal!.name,
        id: this.categoryOriginal!.id
      })
    }
}  
  async handleFormSubmission(newCategory: NewCategory){
  let res; 
  this.isLoading= true
  if (this.idCategory()){
    res= await this.categoryService.editCategory({ id: this.idCategory()!, ...newCategory});
  } else {
    res= await this.categoryService.createCategory(newCategory);
  }
  this.isLoading = false; 
  this.router.navigate(["/admin"])
}
}