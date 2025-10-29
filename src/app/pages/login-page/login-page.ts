import { Component, inject } from '@angular/core';
import { routes } from '../../app.routes';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-page',
  imports: [RouterModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
errorLogin= false;
authService = inject(AuthService)
isLoading =  false;

async login(form:any){
  console.log(form.value)
  this.errorLogin = false;
  if (!form.value.email || !form.value.password){
    this.errorLogin =  true;
    return
  }

  this.isLoading=true;
  await this.authService.login(form.value);
  this.isLoading=false;
  this.errorLogin = true;
}
}
