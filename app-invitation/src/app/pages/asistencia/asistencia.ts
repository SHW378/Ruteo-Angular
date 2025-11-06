import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

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
    acompanantes: 1,
    confirma: '',
    mensaje: ''
  }

  private apiURL = 'http://localhost:3000/saveConfirmacion'
  constructor(private http: HttpClient) {}
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.http.post(this.apiURL, this.model).subscribe({
      next: (data)=> {
        console.log("Datos registrados correctamente");
        alert("Registro insertado")
        form.resetForm();
      },
      error: (error)=> {
        console.log("Error al insertar.");
        alert("Error al insertar")
      }
    })
  }
}
