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

  createUser(){
    localStorage.removeItem('selectedUser');
    this.router.navigate(['/folder']);
  }

  editUser(usuario: any) {
    localStorage.setItem('selectedUser', JSON.stringify(usuario));
    this.router.navigate(['/folder']);
    console.log(usuario);
  }

  async deleteUser(usuario : any) {
    console.log(usuario)
    try {
      const response = await fetch(`http://localhost:5000/userDelete/${usuario.idUsuario}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        // console.log(`User ${usuario.} deleted`);
        this.fetchUsuarios(); // Refresh the list of users
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error in deleteUser:', error);
    }
  }
}