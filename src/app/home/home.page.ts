import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  usuarios: any[] = [];

  constructor( 
    private router:Router 
  ) { }

  ngOnInit() {
    this.fetchUsuarios();
  }

  async fetchUsuarios() {
    try {
      const response = await fetch('http://localhost:5000/getUsers');
      if (response.ok) {
        this.usuarios = await response.json();
      } else {
        console.error('Error al obtener los usuarios:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud fetch:', error);
    }
  }

  editUser( usuario: any ){
    this.router.navigate(['/folder'], { state: { usuario } });
  }

  deleteUser(){}
}
