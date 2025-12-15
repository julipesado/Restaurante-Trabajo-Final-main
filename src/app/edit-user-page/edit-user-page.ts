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
  usuarioOriginal: User | undefined = undefined;
  form = viewChild<NgForm>('editUserForm');
  isLoading = false; 
  user: User | undefined; 


  async ngOnInit() {
    if (this.idUsuario()) {
      this.usuarioOriginal = await this.userService.getUserById(this.idUsuario()!) //* el ! dsp de la variable significa que esta revisado de que no es undefined 
      this.form()?.setValue({
        firstName: this.usuarioOriginal!.firstName,
        lastName: this.usuarioOriginal!.lastName,
        address: this.usuarioOriginal!.address,
        phoneNumber: this.usuarioOriginal!.phoneNumber,
        restaurantName: this.usuarioOriginal!.restaurantName,
        password: this.usuarioOriginal!.password
      }) 
    }
  }

  async handleFormSubmission(form: NgForm) {
      const newUser: User = {
      id: this.usuarioOriginal?.id as number,
      restaurantName: form.value.restaurantName,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      phoneNumber: form.value.phoneNumber,
      password: form.value.password || this.usuarioOriginal?.password,
      isFavorite: form.value.isFavorite
    };
    let res;
    this.isLoading= true
    if (this.idUsuario()) {
      res = await this.userService.editUser({ ...newUser, id: this.idUsuario()!});
    } 
    this.isLoading = false;
    this.router.navigate(["/admin"])
    }
  }