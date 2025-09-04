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

  listOfThings = {
    log:"login",
    api:"api",
  }

  routerTo(path: string) {
    this.router.navigate([path]);
  }

  window() {
    Swal.fire({
      title: '🚀 ¡Bienvenido!',
      text: 'Has hecho clic en Get Started',
      icon: 'success',
      background: '#f0f9ff',        // fondo personalizado
      color: '#333',                // color de texto principal
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#4facfe', // color botón
      width: '400px',               // ancho de la ventana
      padding: '2em',               // padding interno
      backdrop: `rgba(0,0,123,0.4) url("https://sweetalert2.github.io/images/nyan-cat.gif") left top no-repeat`
    });
  }

}
