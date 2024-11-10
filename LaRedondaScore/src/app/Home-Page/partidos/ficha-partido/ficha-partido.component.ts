import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PartidoService } from '../../../Services/Api/partidos.service';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../../navbar/nav/nav.component';
import { Nav2Component } from '../../../navbar/nav2/nav2.component';

@Component({
  selector: 'app-ficha-partido',
  standalone: true,
  imports: [RouterModule,CommonModule,Nav2Component],
  templateUrl: './ficha-partido.component.html',
  styleUrl: './ficha-partido.component.css'
})
export class FichaPartidoComponent implements OnInit {

  partidoId: string = ''; // Id del partido
  cargando: boolean = true; // Indicador de carga
  detallesPartido: any = {}; // Inicializa como objeto vacío

  // Constructor
  constructor(private route: ActivatedRoute, private partidoService: PartidoService) {}

  ngOnInit(): void {
    this.partidoId = this.route.snapshot.paramMap.get('id')!; // Obtenemos el ID desde la ruta
    console.log(this.partidoId);
    this.cargarDetallesPartido(this.partidoId);  // Cargamos los detalles del partido con la ID
  } 

  // Metodo que carga los detalles del partido
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

  // Metodo para obtener el estado de la ficha del partido
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

 // Metodo para obtener la posicion del jugador
  getPosicion(posicion: string): string {
    switch (posicion) {
      case 'G':
        return 'POR';
      case 'D':
        return 'DEF';
      case 'M':
        return 'MED';
      case 'F':
        return 'DEL';
      default:
        return '-';
    }
  }
}