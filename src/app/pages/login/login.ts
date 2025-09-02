import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [FormsModule,], 
})
export class LoginComponent {

  constructor(private router: Router) {} 

  credentials={
    user: 'admin',
    pass: '123', 
  }

  username: string = '';
  password: string = '';

  onLogin() {
    if (this.username !== this.credentials.user) {
      alert('Error in username');
      return;
    }
    if (this.password !== this.credentials.pass) {
      alert('Error in password');
      return;
    }

    console.log('Login successful:', this.username, this.password);
    this.router.navigate(["./home"]);
  }
}
