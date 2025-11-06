import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-listado-confirmaciones',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './listado-confirmaciones.component.html',
  styleUrls: ['./listado-confirmaciones.component.scss']
})
export class ListadoConfirmacionesComponent implements OnInit {
  confirmaciones: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarConfirmaciones();
  }

  cargarConfirmaciones() {
    this.http.get<any[]>('http://localhost:3000/getConfirmaciones')
      .subscribe({
        next: (data) => {
          this.confirmaciones = data;
        },
        error: (error) => {
          console.error('Error al cargar las confirmaciones:', error);
        }
      });
  }
}
