import { Component, inject, input, viewChild } from '@angular/core';
import { NewUser, User } from '../interfaces/interfaces/user';
import { AuthService } from '../services/auth-service';
import { UserService } from '../services/user-service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user-page',
  imports: [FormsModule],
  templateUrl: './edit-user-page.html',
  styleUrl: './edit-user-page.scss',
})
export class EditUserPage {
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);
  idUsuario = input<number>();
  form = viewChild<NgForm>('editUserForm');
  isLoading = false; 
  user: User | undefined; 
  errorBack = false;
  success = false;
  error: string | null = null;
  userId:  number | null = null;  
  usuarioOriginal?: User; // Asegúrate que pueda ser undefined al inicio

   async ngOnInit() {
    if (this.idUsuario()){
    this.usuarioOriginal = await this.userService.getUserById(this.idUsuario()!);

    this.form()?.setValue({
      restaurantName: this.usuarioOriginal!.restaurantName,
      firstName: this.usuarioOriginal!.firstName,
      lastName: this.usuarioOriginal!.lastName,
      address: this.usuarioOriginal!.address,
      phoneNumber: this.usuarioOriginal!.phoneNumber,
      password: this.usuarioOriginal!.password,
      password2: this.usuarioOriginal!.password,
      isFavorite: this.usuarioOriginal!.isFavorite
    });
};
  }

  async handleFormSubmission(form: NgForm) {
    if (!this.usuarioOriginal) return;


    const usuarioEditado: User = {
      id: this.usuarioOriginal.id,
      restaurantName: form.value.restaurantName,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      password: form.value.password,
      phoneNumber: form.value.phoneNumber,
      isFavorite: form.value.isFavorite
    };

    const res = await this.userService.editUser(usuarioEditado);
    this.router.navigate(['/admin']);

    this.isLoading = false;

    if (!res) {
      this.errorBack = true;
      return;
    }

    this.success = true;
  }
}