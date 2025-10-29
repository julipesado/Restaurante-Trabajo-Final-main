import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-explore-page',
  imports: [RouterModule, FormsModule],
  templateUrl: './explore-page.html',
  styleUrl: './explore-page.scss',
})
export class ExplorePage implements OnInit {
  ngOnInit(): void {
    this.userService.getUsers();
  }
  authService = inject (AuthService);
  userService = inject(UserService);
  

}
