import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory';
import { Producto } from '../../model/inventario.model';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.scss'
})
export class DetalleProducto implements OnInit {
  service = inject(InventoryService);
  router = inject(Router);

  // Puede ser null si entramos directo
  producto: Producto | null = null;

  ngOnInit() {
    // Recuperamos del servicio. Si es null, la vista mostrará el mensaje de error.
    this.producto = this.service.getProductoParaAccion();
  }

  volver() {
    this.router.navigate(['/productos']);
  }
}
