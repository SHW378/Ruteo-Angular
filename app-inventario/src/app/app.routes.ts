import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { ListaProductos } from './pages/lista-productos/lista-productos';
import { FormularioProducto } from './pages/formulario-producto/formulario-producto';
import { DetalleProducto } from './pages/detalle-producto/detalle-producto';
import { RegistroMovimiento } from './pages/registro-movimiento/registro-movimiento';
import { HistorialMovimientos } from './pages/historial-movimientos/historial-movimientos';
import { AlertaStockComponent } from './pages/alerta-stock/alerta-stock';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'productos', component: ListaProductos },
  { path: 'productos/nuevo', component: FormularioProducto },
  { path: 'productos/editar', component: FormularioProducto },
  { path: 'detalle-producto', component: DetalleProducto },
  { path: 'movimientos', component: HistorialMovimientos },
  { path: 'movimientos/nuevo', component: RegistroMovimiento },
  { path: 'alertas', component: AlertaStockComponent },

  { path: '**', redirectTo: '' }
];
