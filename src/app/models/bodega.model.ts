import { Producto } from './producto.model';

export interface BodegaRequest {
  nombre: string;
  ubicacion: string;
}

export interface Bodega extends BodegaRequest {
  id: number;
  productos: Producto[];
}
