import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

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

  constructor(
    private router: Router,
    private loadingController: LoadingController,
  ) {}

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

  async presentLoading(message: string) {
    const loading = await this.loadingController.create({
      message,
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  back() {
    localStorage.removeItem('selectedUser');
    this.router.navigate(['/home']);
  }

  async event() {
    if (this.action === 'Edit User info') {
      await this.presentLoading('Editing user information...');
      await this.editUser();
    } else {
      await this.presentLoading('Creating user...');
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
