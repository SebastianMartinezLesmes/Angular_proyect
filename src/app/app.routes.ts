import { Routes } from '@angular/router';
import { ApiComponent } from './pages/api/api';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { TimeLineComponent } from './pages/time-line/time-line';

export const routes: Routes = [
    { path: 'time_line', component: TimeLineComponent }, // ruta para time line
    { path: 'login', component: LoginComponent }, // ruta para login
    { path: 'home', component: HomeComponent },   // ruta para home
    { path: 'api', component: ApiComponent },     // ruta para api
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
