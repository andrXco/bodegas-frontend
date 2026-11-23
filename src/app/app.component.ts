import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BodegaFormComponent } from './bodegas/bodega-form.component';
import { ProductoTablaComponent } from './productos/producto-tabla.component';

@Component({
  selector: 'app-root',
  imports: [BodegaFormComponent, ProductoTablaComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
