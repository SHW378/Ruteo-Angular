import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InventoryService } from '../../services/inventory';
import { Producto } from '../../model/inventario.model';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './formulario-producto.html',
  styleUrls: ['./formulario-producto.scss']
})
export class FormularioProducto implements OnInit {
  inventoryService = inject(InventoryService);
  router = inject(Router);

  esEdicion = false;
  idProducto: number | null = null;
  listaCategorias = this.inventoryService.categorias;

  // Inicializamos el formulario con los campos necesarios
  form: any = {
    sku: '',
    nombre: '',
    categoria_id: '',
    precio: 0,
    stock: 0
  };

  ngOnInit() {
    this.inventoryService.obtenerCategorias().subscribe();
    const prod = this.inventoryService.getProductoParaAccion();
    if (prod) {
      this.esEdicion = true;
      // se usa 'as number' o comprobamos undefined porque id es opcional en la interfaz
      this.idProducto = prod.id || null;
      this.form = { ...prod };
    }
  }

  updateField(event: any, field: string) {
    this.form[field] = event.target.value;
  }

  guardar(event: Event) {
    event.preventDefault();
    if(!this.form.categoria_id) {
      alert("Selecciona una categoría");
      return;
    }

    const productoAGuardar: Producto = { ...this.form };

    if (this.esEdicion && this.idProducto) {
      this.inventoryService.editarProducto(this.idProducto, productoAGuardar).subscribe({
        next: () => {
          alert('Producto actualizado');
          this.router.navigate(['/productos']);
        },
        error: (e) => alert('Error al actualizar')
      });
    } else {
      this.inventoryService.crearProducto(productoAGuardar).subscribe({
        next: () => {
          alert('Producto creado');
          this.router.navigate(['/productos']);
        },
        error: (e) => alert('Error al crear')
      });
    }
  }

  cancelar() {
    this.router.navigate(['/productos']);
  }
}
