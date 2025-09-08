import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [FormsModule], 
})
export class LoginComponent {

  constructor(private router: Router) {} 

  // credenciales con rol
  credentials = [
    { user: 'admin', pass: '123', rol: 'Admin' },
    { user: 'pol', pass: '123', rol: 'Admin' },
    { user: 'user',  pass: '123', rol: 'Usuario' },
  ];

  username: string = '';
  password: string = '';

  onLogin() {
    // verificar si existe el usuario
    const foundUser = this.credentials.find(cred => cred.user === this.username);

    if (!foundUser) {
      Swal.fire({
        title: '❌ Usuario inexistente',
        text: 'El usuario ingresado no está registrado.',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
        confirmButtonColor: '#d33'
      });
      return;
    }

    // validar contraseña
    if (foundUser.pass !== this.password) {
      Swal.fire({
        title: '⚠️ Contraseña incorrecta',
        text: 'La contraseña ingresada no coincide.',
        icon: 'warning',
        confirmButtonText: 'Reintentar',
        confirmButtonColor: '#f39c12'
      });
      return;
    }

    localStorage.setItem('loggedUser', JSON.stringify(foundUser));
    this.router.navigate(["./home"]);
  }
}
