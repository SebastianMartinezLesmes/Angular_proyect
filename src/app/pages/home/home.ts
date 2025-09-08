import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';

@Component({
  templateUrl: './home.html',
  styleUrl: './home.scss',
  selector: 'app-home',
  imports: [],
})
export class HomeComponent {

  constructor(private router: Router) {}

  listOfThings = [
    { label: 'API', path: '/api' },
    { label: 'Time Line', path: '/time_line' },
    { label: 'Logout', path: '/login' },
  ];

  ngOnInit() {
    this.hellow();
  }
  
  routerTo(path: string) {
    this.router.navigate([path]);
  }

  hellow(){
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);

      Swal.fire({
        title: `🎉 Bienvenido ${user.user}!`,
        text: `Tu rol es: ${user.rol}`,
        icon: 'success',
        background: '#f0f9ff',
        color: '#333',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#4facfe',
        width: '400px',
        padding: '2em',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          left top
          no-repeat
        `
      });
    }
  }

  window() {
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);

      Swal.fire({
        title: `🙋‍♂️ Eres:`,
        html: `
          <p><b>Nombre de Usuario:</b> ${user.user}</p>
          <p><b>Rol:</b> ${user.rol}</p>
        `,
        icon: 'info',
        background: '#fff',
        color: '#333',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#3085d6',
        width: '400px',
        padding: '1.5em',
      });
    } else {
      Swal.fire({
        title: '⚠️ No hay sesión activa',
        text: 'Por favor inicia sesión de nuevo.',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
    }
  }
}
