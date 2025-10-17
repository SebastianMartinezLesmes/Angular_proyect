import { Routes } from '@angular/router';
import { ApiComponent } from './pages/api/api';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { TimeLineComponent } from './pages/time-line/time-line';
import { EstadisticComponent } from './pages/estadistic/estadistic';
import { GameComponent } from './pages/game/game';
import { TestingComponent } from './pages/testing/testing'

export const routes: Routes = [
    { path: 'estadistic', component: EstadisticComponent }, // ruta para time line
    { path: 'time_line', component: TimeLineComponent }, // ruta para time line
    { path: 'login', component: LoginComponent }, // ruta para login
    { path: 'home', component: HomeComponent },   // ruta para home
    { path: 'api', component: ApiComponent },     // ruta para api
    { path: 'game', component: GameComponent },   // ruta para game 2D
    { path: 'test', component: TestingComponent },   // ruta para pruebas de codigo
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
