import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InventoryService } from '../../services/inventory';
import { Producto } from '../../model/inventario.model';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.scss'
})
export class ListaProductos implements OnInit {
  inventoryService = inject(InventoryService);
  router = inject(Router);

  // Al importar Producto correctamente, TypeScript reconoce los campos
  productos = this.inventoryService.productos;

  ngOnInit() {
    this.inventoryService.obtenerProductos().subscribe();
  }

  nuevoProducto() {
    this.inventoryService.limpiarSeleccion();
    this.router.navigate(['/productos/nuevo']);
  }

  editar(prod: Producto) {
    this.inventoryService.setProductoParaAccion(prod);
    this.router.navigate(['/productos/editar']);
  }

  verDetalle(prod: Producto) {
    this.inventoryService.setProductoParaAccion(prod);
    this.router.navigate(['/detalle-producto']);
  }
}
