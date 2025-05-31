import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PartidoService } from '../../../Services/Api/partidos.service';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../../navbar/nav/nav.component';
import { Nav2Component } from '../../../navbar/nav2/nav2.component';
import { BarraLateralComponent } from '../../barra-lateral/barra-lateral.component';

@Component({
  selector: 'app-ficha-partido',
  standalone: true,
  imports: [RouterModule,CommonModule,Nav2Component,BarraLateralComponent],
  templateUrl: './ficha-partido.component.html',
  styleUrl: './ficha-partido.component.css'
})
export class FichaPartidoComponent implements OnInit {

  partidoId: string = ''; // Id del partido
  cargando: boolean = true; // Indicador de carga
  detallesPartido: any = {}; // Inicializa como objeto vacío
    estadisticasPartido: any = null; // <-- Para guardar las estadísticas


  // Constructor
  constructor(private route: ActivatedRoute, private partidoService: PartidoService) {}

  ngOnInit(): void {
    this.partidoId = this.route.snapshot.paramMap.get('id')!; // Obtenemos el ID desde la ruta
    console.log(this.partidoId);
    this.cargarDetallesPartido(this.partidoId);  // Cargamos los detalles del partido con la ID
  } 


 cargarDetallesPartido(id: string): void {
    this.partidoService.getPartidoPorId(id).subscribe(
      (data) => {
        if (data.response.length > 0) {
          this.detallesPartido = data.response[0];
          this.cargarEstadisticasSegunEstado(this.detallesPartido.fixture.status);
        } else {
          console.error('No se encontraron detalles para el partido.');
        }
        this.cargando = false;
      },
      (error) => {
        console.error('Error al cargar los detalles del partido', error);
        this.cargando = false;
      }
    );
  }
/*
  cargarEstadisticasSegunEstado(status: { long: string, short: string, elapsed: number, extra?: number }): void {
    const partidoTerminado = status.short === 'FT' || status.short === '1H'|| status.short === '2H';

    this.partidoService.getFixtureStatistics(+this.partidoId, partidoTerminado).subscribe(
      (data) => {
        this.estadisticasPartido = data.response;
        console.log('Estadísticas cargadas:', this.estadisticasPartido);
      },
      (error) => {
        console.error('Error al cargar estadísticas del partido', error);
      }
    );
  }
*/
cargarEstadisticasSegunEstado(status: { long: string, short: string, elapsed: number, extra?: number }): void {
  const partidoTerminado = status.short === 'FT';
  const enJuego = status.short === '1H' || status.short === '2H';

  const usarHalf = partidoTerminado || enJuego;

  this.partidoService.getFixtureStatistics(this.partidoId, usarHalf).subscribe(
    (data) => {
      this.estadisticasPartido = data.response;
      console.log('Estadísticas cargadas:', this.estadisticasPartido);
    },
    (error) => {
      console.error('Error al cargar estadísticas del partido', error);
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


getStatValue(stats: any[], type: string): number {
  const stat = stats.find(s => s.type === type);
  return stat ? stat.value : 0;
}

maxStatValue(type: string): number {
  const homeVal = this.getStatValue(this.estadisticasPartido[0].statistics, type);
  const awayVal = this.getStatValue(this.estadisticasPartido[1].statistics, type);
  return Math.max(homeVal, awayVal, 1); // mínimo 1 para evitar ancho cero
}




getNombreEstadistica(type: string): string {
  switch(type) {
    case 'Shots on Goal':
      return 'Disparos a Puerta';
    case 'Shots off Goal':
      return 'Disparos Fuera';
    case 'Total Shots':
      return 'Tiros Totales';
    case 'Blocked Shots':
      return 'Tiros Bloqueados';
    case 'Shots insidebox':
      return 'Tiros dentro del área';
    case 'Shots outsidebox':
      return 'Tiros fuera del área';
    case 'Fouls':
      return 'Faltas';
    case 'Corner Kicks':
      return 'Tiros de esquina';
    case 'Offsides':
      return 'Fuera de Juego';
    case 'Ball Possession':
      return 'Posesión de balón';
    case 'Yellow Cards':
      return 'Tarjetas Amarillas';
    case 'Red Cards':
      return 'Tarjetas Rojas';
    case 'Goalkeeper Saves':
      return 'Atajadas';
    case  'expected_goals':
      return 'Goles Esperados';
    case 'Total passes':
      return 'Pases Totales';
    case 'Passes accurate':
      return 'Pases Completados';
    default:
      return type; // Si no hay traducción, devuelve el texto original
  }
}



}