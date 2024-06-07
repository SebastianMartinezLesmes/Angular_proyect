import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  info: any = {
    idUsuario: 0,
    nombreUsuario: '',
    apellidoUsuario: '',
    contrasenaUsuario: '',
    rol: ''
  };
  action: string = '';
  textButton = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('selectedUser');
    if (storedUser) {
      this.info = JSON.parse(storedUser);
      this.action = 'Edit User info';
      this.textButton = 'Edit info';
    } else {
      this.action = 'Create User';
      this.textButton = 'Create user';
    }
  }

  back() {
    localStorage.removeItem('selectedUser');
    this.router.navigate(['/home']);
  }

  async event() {
    if (this.action === 'Edit User info') {
      await this.editUser();
    } else {
      await this.createUser();
    }
  }

  async createUser() {
    try {
      this.info.idUsuario = 15;

      const response = await fetch('http://localhost:5000/postUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.info)
      });
      if (response.ok) {
        const result = await response.json();
        console.log('User created:', result);
        localStorage.removeItem('selectedUser');
        this.back();
      } else {
        console.error('Error creating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error in createUser:', error);
    }
  }

  async editUser() {
    try {
      const response = await fetch(`http://localhost:5000/testUpdate/${this.info.idUsuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.info)
      });
      if (response.ok) {
        const result = await response.json();
        console.log('User updated:', result);
        localStorage.removeItem('selectedUser');
        this.back();
      } else {
        console.error('Error updating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error in editUser:', error);
    }
  }
}
