export interface Producto {
  id?: number;
  sku: string;
  nombre: string;
  categoria_id: number | string;
  categoria_nombre?: string;
  precio: number;
  stock: number;
  created_at?: string;
}

export interface Categoria {
  id: number;
  nombre: string;
}


export interface Movimiento {
  id?: number;
  producto_id: number;
  producto_nombre?: string;
  tipo: 'Entrada' | 'Salida';
  cantidad: number;
  fecha?: Date | string;
}
