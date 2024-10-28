import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PartidoService } from '../../../Api/partidos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ficha-partido',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './ficha-partido.component.html',
  styleUrl: './ficha-partido.component.css'
})
export class FichaPartidoComponent implements OnInit {

  partidoId: string = '';
  cargando: boolean = true; // Indicador de carga
  detallesPartido: any = {}; // Inicializa como objeto vacío

  constructor(private route: ActivatedRoute, private partidoService: PartidoService) {}

  ngOnInit(): void {
    this.partidoId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.partidoId);
    this.cargarDetallesPartido(this.partidoId);
  }

  cargarDetallesPartido(id: string): void {
    this.partidoService.getPartidoPorId(id).subscribe(
      (data) => {
        if (data.response.length > 0) {
          this.detallesPartido = data.response[0]; // Asigna el primer elemento
        } else {
          console.error('No se encontraron detalles para el partido.');
        }
        this.cargando = false; // Cambia el estado de carga
      },
      (error) => {
        console.error('Error al cargar los detalles del partido', error);
        this.cargando = false; // Cambia el estado de carga incluso en caso de error
      }
    );
  }

  getEstadoFicha(status: { long: string, short: string, elapsed: number, extra?: number }): string {
  switch (status.short) {
    case 'HT': // Medio tiempo
      return `Entretiempo`;
    case '1H': // Primera mitad
      return ` ${status.elapsed}'`;
    case '2H': // Segunda mitad
      return ` ${status.elapsed}'`;
    case 'ET': // Tiempo extra
      return ` - ${status.elapsed}' + ${status.extra ? `(+${status.extra})` : ''}`;
    case 'PEN': // Penales
      return "Penales";
    case 'FT': // Finalizado
      return "Finalizado";
    default:
      return "No ha comenzado.";
  }
 }
  getPosicion(posicion: string): string {
    switch (posicion) {
      case 'G':
        return 'Portero';
      case 'D':
        return 'Defensor';
      case 'M':
        return 'Centrocampista';
      case 'F':
        return 'Delantero';
      default:
        return 'Desconocido';
    }
  }
}