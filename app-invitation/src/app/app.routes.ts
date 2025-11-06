import { Routes } from '@angular/router';
import { Invitation } from './pages/invitation/invitation';
import { Asistencia } from './pages/asistencia/asistencia';
import { ListadoComponentes } from './pages/listado-componentes/listado-componentes';

export const routes: Routes = [
  {path: '', component: Invitation},
  {path: 'asistencia', component: Asistencia},
  {path: 'listado', component: ListadoComponentes},
  {path: '**', redirectTo: ''} //Redireccionamiento por default
];

