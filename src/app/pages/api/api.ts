import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  templateUrl: './api.html',
  styleUrl: './api.scss',
  selector: 'app-api',
  imports: [],
})
export class ApiComponent   {

  constructor(private router: Router) {}

  routerTo(path: string) {
    this.router.navigate([path]);
  }
}
