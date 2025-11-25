import { Component, inject, OnInit, Input, signal, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory';
import { Producto } from '../../model/inventario.model';

@Component({
  selector: 'app-alerta-stock', // Selector corregido
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerta-stock.html', // Archivo corregido
  styleUrls: ['./alerta-stock.scss']     // Archivo corregido
})
export class AlertaStockComponent implements OnInit, OnChanges {
  private router = inject(Router);
  private inventoryService = inject(InventoryService);

  // Input para recibir datos desde el componente Inicio
  @Input() productosBajos: any[] | null = null;

  // Señal interna
  listaAlertas = signal<any[]>([]);
  cargando = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productosBajos'] && this.productosBajos) {
      this.listaAlertas.set(this.productosBajos);
      this.cargando = false;
    }
  }

  ngOnInit() {
    // Si entramos directo por la ruta /alertas (sin input), cargamos datos
    if (!this.productosBajos) {
      this.inventoryService.obtenerDashboard().subscribe({
        next: (data) => {
          this.listaAlertas.set(data.alertas || []);
          this.cargando = false;
        },
        error: (err) => {
          console.error(err);
          this.cargando = false;
        }
      });
    }
  }

  irAlDetalle(producto: Producto) {
    this.inventoryService.setProductoParaAccion(producto);
    this.router.navigate(['/detalle-producto']);
  }
}
