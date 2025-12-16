import { Component, inject, input, viewChild } from '@angular/core';
import { NewUser, UpdateUser, User } from '../interfaces/interfaces/user';
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
  userId: number | null = null;
  usuarioOriginal: User | undefined = undefined; 

    async ngOnInit() {
    if (this.idUsuario()) {
      this.usuarioOriginal = await this.userService.getUserById(this.idUsuario()!)
      this.form()?.setValue({
        firstName: this.usuarioOriginal!.firstName,
        lastName: this.usuarioOriginal!.lastName,
        address: this.usuarioOriginal!.address,
        restaurantName: this.usuarioOriginal!.restaurantName,
        phoneNumber: this.usuarioOriginal!.phoneNumber,
      })
    }
  }
  async handleFormSubmission(form: NgForm) {

  this.errorBack = false;

  if (!this.usuarioOriginal || !this.idUsuario()) {
    this.errorBack = true;
    return;
  }

  this.isLoading = true;

  const editUser: UpdateUser = {
    id: this.usuarioOriginal.id,
    restaurantName: form.value.restaurantName,
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    address: form.value.address,
    phoneNumber: form.value.phoneNumber,
  };

  if (form.value.password?.trim()) {
    editUser.password = form.value.password;
  }

  const res = await this.userService.editUser({
    ...editUser,
    id: this.idUsuario()!,
  });

  this.isLoading = false;

  if (!res) {
    this.errorBack = true;
    return;
  }

  this.router.navigate(['/admin']);
}

}
