import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  templateUrl: './home.html',
  styleUrl: './home.scss',
  selector: 'app-home',
  imports: [],
})
export class HomeComponent {

  constructor(private router: Router) {}

  routerTo(path: string) {
    this.router.navigate([path]);
  }

}
