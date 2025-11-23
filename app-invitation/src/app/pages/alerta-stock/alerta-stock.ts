import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importamos la interfaz 'Producto' si queremos tipar estrictamente, o usamos 'any' si prefieres simpleza
import { Producto } from '../../model/inventario.model';

@Component({
  selector: 'app-stock-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerta-stock.html',
  styleUrls: ['./alerta-stock.scss']
})
export class StockAlertComponent {
  // Recibe la lista de productos con stock bajo desde el componente padre (Inicio)
  // El decorador @Input() es vital para que este componente sea reutilizable
  @Input() productosBajos: any[] = [];
}
