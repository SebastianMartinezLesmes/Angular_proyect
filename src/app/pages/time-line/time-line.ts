import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.html',
  styleUrl: './time-line.scss',
  imports: [],
})
export class TimeLineComponent {

  constructor(private router: Router) {}

  listOfThings = [
    { label: 'Home', path: '/home' },
    { label: 'Logout', path: '/login' },
  ];

  ngOnInit(): void {}

  routerTo(path: string) {
    this.router.navigate([path]);
  }

}
