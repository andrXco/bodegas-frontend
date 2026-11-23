import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { BodegaService } from '../services/bodega.service';

@Component({
  selector: 'app-bodega-form',
  imports: [ReactiveFormsModule],
  templateUrl: './bodega-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodegaFormComponent {
  private readonly bodegas = inject(BodegaService);
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly longitudMaxima = 255;
  protected readonly formulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(this.longitudMaxima)]],
    ubicacion: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(this.longitudMaxima)]],
  });

  protected readonly guardando = signal(false);
  protected readonly confirmacion = signal('');
  protected readonly error = signal('');

  protected guardar(): void {
    if (this.guardando()) {
      return;
    }

    this.confirmacion.set('');
    this.error.set('');
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { nombre, ubicacion } = this.formulario.getRawValue();
    this.guardando.set(true);
    this.bodegas
      .crear({ nombre: nombre.trim(), ubicacion: ubicacion.trim() })
      .pipe(finalize(() => this.guardando.set(false)))
      .subscribe({
        next: (bodega) => {
          this.formulario.reset();
          this.confirmacion.set(`Se registró la bodega «${bodega.nombre}».`);
        },
        error: (error: HttpErrorResponse) => {
          const mensaje = error.status === 400 ? error.error?.message : undefined;
          this.error.set(
            typeof mensaje === 'string'
              ? mensaje
              : 'No se pudo registrar la bodega. Intenta de nuevo.',
          );
        },
      });
  }

  protected errorDe(campo: 'nombre' | 'ubicacion'): string {
    const control = this.formulario.controls[campo];
    if (!control.touched || control.valid) {
      return '';
    }
    if (control.hasError('maxlength')) {
      return `Escribe máximo ${this.longitudMaxima} caracteres.`;
    }
    return campo === 'nombre' ? 'Escribe el nombre de la bodega.' : 'Escribe la ubicación.';
  }
}
