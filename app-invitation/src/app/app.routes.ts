import { Routes } from '@angular/router';
import { Invitation } from './pages/invitation/invitation';
import { Asistencia } from './pages/asistencia/asistencia';

export const routes: Routes = [
  {path: '', component: Invitation},
  {path: 'asistencia', component: Asistencia},
  {path: '**', redirectTo: ''} //Redireccionamiento por default
];

