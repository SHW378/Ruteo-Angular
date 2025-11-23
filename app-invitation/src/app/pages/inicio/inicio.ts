import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InventoryService } from '../../services/inventory';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss'
})
export class Inicio implements OnInit {
  inventoryService = inject(InventoryService);

  totalProductos = signal(0);
  valorInventario = signal(0);
  alertasStock = signal<any[]>([]);

  ngOnInit() {
    this.inventoryService.obtenerDashboard().subscribe({
      next: (data) => {
        this.totalProductos.set(data.resumen.total_productos);
        this.valorInventario.set(data.resumen.valor_total || 0);
        this.alertasStock.set(data.alertas);
      },
      error: (err) => console.error('Error cargando dashboard:', err)
    });
  }
}
