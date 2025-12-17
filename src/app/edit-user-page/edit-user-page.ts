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
    const id = this.idUsuario();

    // 1. Si el ID no es un número válido, nos vamos
    if (!id) {
        console.error("ID de usuario inválido, redirigiendo...");
        this.router.navigate(['/admin']); // O a donde quieras redirigir
        return;
    }

    try {
        this.usuarioOriginal = await this.userService.getUserById(id);
        
        // 2. Solo intentamos llenar el formulario si usuarioOriginal existe
        if (this.usuarioOriginal) {
            this.form()?.setValue({
                restaurantName: this.usuarioOriginal.restaurantName,
                password: '', 
                password2: '', // Dejamos la contraseña vacía por seguridad
                firstName: this.usuarioOriginal.firstName,
                lastName: this.usuarioOriginal.lastName,
                address: this.usuarioOriginal.address,
                phoneNumber: this.usuarioOriginal.phoneNumber,
                // OJO: Si estos campos no están en tu HTML (como isFavorite), quítalos de aquí
                // isFavorite: this.usuarioOriginal.isFavorite 
            });
        }
    } catch (error) {
        console.error("Error cargando usuario:", error);
        this.router.navigate(['/admin']);
    }
}

  async handleFormSubmission(form: NgForm) {

  // 1. Ver si el botón realmente llama a la función
  console.log(">>> 1. Función handleFormSubmission INICIADA");
  console.log("Estado del formulario:", form.valid ? 'Válido' : 'Inválido');
  console.log("Valores del formulario:", form.value);
  
  // 2. Ver si tenemos los datos originales cargados
  console.log("Usuario Original:", this.usuarioOriginal);
  console.log("ID Usuario:", this.idUsuario());

  if (!this.usuarioOriginal || !this.idUsuario()) {
    console.error(">>> ERROR: Faltan datos originales. La función se detiene aquí.");
    this.errorBack = true;
    return;
  }

  console.log(">>> 2. Pasamos la validación inicial, preparando datos...");

  const usuarioEditado: User = {
  id: this.usuarioOriginal.id,
  restaurantName: form.value.restaurantName,
  firstName: form.value.firstName,
  lastName: form.value.lastName,
  address: form.value.address,
  phoneNumber: form.value.phoneNumber,
  
  // Lógica de contraseña (la corrección anterior)
  password: form.value.password ? form.value.password : this.usuarioOriginal.password,

  // IMPORTANTE: Esto no viene del form, viene del original
  isFavorite: this.usuarioOriginal.isFavorite 
};

// AGREGA ESTO TEMPORALMENTE PARA VER QUÉ ENVÍAS:
console.log("Datos que se envían:", usuarioEditado);
  
  console.log(">>> 3. Intentando enviar al servidor...");
  try {
     await this.userService.editUser(usuarioEditado);
     console.log(">>> 4. ¡ÉXITO! Respuesta recibida.");
     this.router.navigate(['/admin']);
  } catch (e) {
     console.error(">>> ERROR EN EL CATCH:", e);
  }
}
}
