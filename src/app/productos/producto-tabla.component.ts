import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { Producto } from '../models/producto.model';
import { BodegaService } from '../services/bodega.service';

interface FilaProducto {
  producto: Producto;
  bodega: string;
}

@Component({
  selector: 'app-producto-tabla',
  imports: [DecimalPipe],
  templateUrl: './producto-tabla.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductoTablaComponent implements OnInit {
  private readonly bodegas = inject(BodegaService);
  protected readonly filas = signal<FilaProducto[]>([]);
  protected readonly estado = signal<'cargando' | 'disponible' | 'error'>('cargando');

  ngOnInit(): void {
    this.cargar();
  }

  protected cargar(): void {
    this.estado.set('cargando');
    this.bodegas.listar().subscribe({
      next: (bodegas) => {
        this.filas.set(
          bodegas.flatMap((bodega) =>
            bodega.productos.map((producto) => ({ producto, bodega: bodega.nombre })),
          ),
        );
        this.estado.set('disponible');
      },
      error: () => this.estado.set('error'),
    });
  }
}
