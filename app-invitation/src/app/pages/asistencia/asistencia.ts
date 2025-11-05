import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './asistencia.html',
  styleUrl: './asistencia.scss'
})
export class Asistencia {
  model = {
    nombre: '',
    invitados: '',
    confirmacion:'', //true o false
    mensaje: ''
  }
}
