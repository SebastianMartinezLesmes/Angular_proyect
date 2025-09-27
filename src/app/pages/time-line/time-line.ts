import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { TimelineModule } from 'primeng/timeline'; // 👈 IMPORTANTE
import { CardModule } from 'primeng/card'; // opcional para tarjetas
import { TagModule } from 'primeng/tag';   // opcional para tags

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.html',
  styleUrls: ['./time-line.scss'],
  standalone: true,
  imports: [ TimelineModule, CardModule, TagModule], // 👈 aquí
})
export class TimeLineComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  eventos: any[] = [];

  listRoutes = [
    { label: 'Home', path: '/home' },
    { label: 'Logout', path: '/login' },
  ];

  ngOnInit(): void {
    this.getData();
  };

  routerTo(path: string) {
    this.router.navigate([path]);
  };

  getData() {
    this.http.get<any[]>('/json/historico.json').subscribe({
      next: (data) => {
        this.eventos = data;
        console.log("✅ Datos cargados:", this.eventos);
      },
      error: (err) => {
        console.error("❌ Error cargando JSON:", err);
      }
    })
  };
}
