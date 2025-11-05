import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-register-page',
  imports: [RouterModule, FormsModule, //Spinner*//
],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage {
errorRegister=false;
usersService= inject(UserService);
isLoading= false; 
router = inject(Router)

  async register(form:any){
    console.log(form.value);
    this.errorRegister = false;
    if(!form.value.restaurantName || !form.value.password || !form.value.password2 || form.value.password !== form.value.password2){
      this.errorRegister = true;
      return
    }
    this.isLoading = true;
    const res= await this.usersService.register(form.value);
    if(res.ok){
      this.router.navigate(["/login"])
    } //** res.ok --> me llegó un status code 200 (éxito) */
    this.isLoading = false; 
    this.errorRegister = true; 
  }
}