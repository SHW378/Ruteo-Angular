import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { InventoryService } from '../../services/inventory';
import { AlertaStockComponent } from '../../pages/alerta-stock/alerta-stock';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, AlertaStockComponent],
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
        if (data) {
          this.totalProductos.set(data.resumen.total_productos || 0);
          this.valorInventario.set(data.resumen.valor_total || 0);
          this.alertasStock.set(data.alertas || []);
        }
      },
      error: (err) => console.error('Error dashboard:', err)
    });
  }
}
