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
export class RegistroMovimiento implements OnInit {
  inventoryService = inject(InventoryService);
  router = inject(Router);

  listaProductos = signal<any[]>([]);

  movimiento = {
    producto_id: '', // Se mantiene como string temporalmente por el select
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

    // Validación
    if (!this.movimiento.producto_id) {
      alert('Seleccione un producto');
      return;
    }
    if (this.movimiento.cantidad <= 0) {
      alert('La cantidad debe ser mayor a 0');
      return;
    }

    // PREPARAR DATOS: Convertimos a números antes de enviar
    const datosParaEnviar = {
      producto_id: Number(this.movimiento.producto_id),
      cantidad: Number(this.movimiento.cantidad),
      tipo: this.movimiento.tipo
    };

    this.inventoryService.registrarMovimiento(datosParaEnviar).subscribe({
      next: () => {
        alert('Movimiento registrado con éxito');
        this.router.navigate(['/movimientos']);
      },
      error: (err) => {
        console.error('Error detallado:', err);
        alert('Error: ' + (err.error?.message || err.error?.error || 'Error en servidor'));
      }
    });
  }
}
