import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InventoryService } from '../../services/inventory';

@Component({
  selector: 'app-historial-movimientos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './historial-movimientos.html',
  styleUrl: './historial-movimientos.scss'
})
export class HistorialMovimientos implements OnInit { // Nombre simplificado
  inventoryService = inject(InventoryService);
  movimientos = signal<any[]>([]);

  ngOnInit() {
    this.inventoryService.obtenerHistorial().subscribe(data => {
      this.movimientos.set(data);
    });
  }
}
