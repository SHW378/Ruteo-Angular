import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InventoryService } from '../../services/inventory';

@Component({
  selector: 'app-registro-movimiento',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './registro-movimiento.html',
  styleUrl: './registro-movimiento.scss'
})
export class RegistroMovimiento implements OnInit { // Nombre simplificado
  inventoryService = inject(InventoryService);
  router = inject(Router);

  listaProductos = signal<any[]>([]);

  movimiento = {
    producto_id: '',
    tipo: 'Entrada',
    cantidad: 1
  };

  ngOnInit() {
    this.inventoryService.obtenerProductos().subscribe(data => {
      this.listaProductos.set(data);
    });
  }

  updateField(event: any, field: string) {
    // @ts-ignore
    this.movimiento[field] = event.target.value;
  }

  registrar(event: Event) {
    event.preventDefault();
    if (!this.movimiento.producto_id) {
      alert('Seleccione un producto');
      return;
    }

    this.inventoryService.registrarMovimiento(this.movimiento).subscribe({
      next: () => {
        alert('Movimiento registrado con éxito');
        this.router.navigate(['/movimientos']);
      },
      error: (err) => {
        alert('Error: ' + (err.error.message || 'Error en servidor'));
      }
    });
  }
}
