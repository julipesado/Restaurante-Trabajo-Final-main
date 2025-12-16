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
  errorBack = false;
  success = false;
  error: string | null = null;


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
    });
};
  }

  async handleFormSubmission(usuarioEditado: NewUser) {
    let res;
    this.isLoading = true;
    if (!this.idUsuario()){
     return 
    }else{
      res = await this.userService.editUser({...usuarioEditado, id: this.idUsuario()!});
    }
    this.isLoading = false;

    this.router.navigate(["/admin"]);
  }
}