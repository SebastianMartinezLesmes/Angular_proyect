import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Pet {
  breed: string;
  subBreeds: string[];
  image: string;
}

@Component({
  templateUrl: './api.html',
  styleUrl: './api.scss',
  selector: 'app-api',
  imports: [FormsModule], // 👈 habilitamos ngModel
})
export class ApiComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  dogs: Pet[] = [];
  dogsFilter: Pet[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.getDogs();
  }

  routerTo(path: string) {
    this.router.navigate([path]);
  }

  getDogs() {
    this.searchTerm = '';
    const url = 'https://dog.ceo/api/breeds/list/all';

    this.http.get<any>(url).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          const breeds = Object.keys(res.message);

          this.dogs = breeds.map(breed => ({
            breed,
            subBreeds: res.message[breed],
            image: ''
          }));

          // recargar imágenes
          this.dogs.forEach(dog => {
            this.loadDogImage(dog.breed).then(img => dog.image = img);
          });

          this.dogsFilter = [...this.dogs]; // copia inicial
        }
      },
      error: (err) => {
        console.error('❌ Error al obtener perros:', err);
      }
    });
  }

  async loadDogImage(breed: string): Promise<string> {
    const url = `https://dog.ceo/api/breed/${breed}/images/random`;
    try {
      const res = await this.http.get<any>(url).toPromise();
      return res?.message || '';
    } catch {
      return '';
    }
  }

  // 👇 filtro de búsqueda
  filterDogs() {
    const term = this.searchTerm.toLowerCase();
    this.dogsFilter = this.dogs.filter(dog =>
      dog.breed.toLowerCase().includes(term) ||
      dog.subBreeds.some(sub => sub.toLowerCase().includes(term))
    );
  }
}
