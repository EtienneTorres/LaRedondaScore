import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {OnInit } from '@angular/core';
import { PartidoService } from '../../Api/partidos.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-partidos',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './partidos.component.html',
  styleUrl: './partidos.component.css'
})
 export class PartidosComponent  implements OnInit {

    
     // Propiedad para almacenar los partidos organizados por liga
  partidosPorLiga: { [liga: string]: any[] } = {};


 // Array de ligas que deseas mostrar
 // Array de ligas que deseas mostrar, incluyendo el país
ligasDeseadas: { name: string; country: string }[] = [
  { name: "Premier League", country: "England" },
  { name: "Serie A", country: "Italy" },
  { name: "Liga Profesional Argentina", country: "Argentina" },
  { name: "La Liga", country: "Spain" },
  { name: "Bundesliga", country: "Germany" },
  { name: "Ligue 1", country: "France" },
  { name: "Conmebol Sudamericana", country: "South America" },
  { name: "Eredivisie", country: "Netherlands" },
  { name: "Primeira Liga", country: "Portugal" },
  { name: "World Cup", country: "International" }, // Mundial no tiene un país específico
  { name: "Ligue 2", country: "France" },
  { name: "UEFA Champions League", country: "World" }, // Champions League es un torneo internacional
  { name: "Primera B Metropolitana", country: "Argentina" },
  { name: "Copa De La Liga Profesional", country: "Argentina" },
  { name: "Copa Argentina", country: "Argentina" },
  { name: "Torneo Federal A", country: "Argentina" },
  { name: "Primera D", country: "Argentina" },
  { name: "Primera C", country: "Argentina" },
  { name: "Primera Nacional", country: "Argentina" },
  { name: "Primera B Metropolitana", country: "Argentina" },
  { name: "Süper Lig", country: "Turkey"},
  { name: "Premier League", country: "Singapore" }
];


fechaSeleccionada: string = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
  
constructor(private partidoService: PartidoService) {}

ngOnInit(): void {
  this.cargarPartidosDelDia(this.fechaSeleccionada); // Cargar los partidos del día actual
}

// Cargar partidos de un día específico
cargarPartidosDelDia(fecha: string): void {
  this.partidoService.getPartidosDelDia(fecha).subscribe((data) => {
    const partidosFiltrados = this.filtrarPartidosPorUtc3(data.response, fecha);

    // Agrupar los partidos por liga
    this.partidosPorLiga = partidosFiltrados.reduce((acc: any, partido: any) => {
      const ligaNombre = partido.league.name;
      const paisNombre = partido.league.country;
      const ligaClave = `${ligaNombre} (${paisNombre})`;

      const ligaDeseada = this.ligasDeseadas.find((liga) => 
        liga.name === ligaNombre && liga.country === paisNombre
      );

      if (ligaDeseada) {
        if (!acc[ligaClave]) acc[ligaClave] = [];
        acc[ligaClave].push(partido);
      }
      return acc;
    }, {});
  });
}

// Navegar hacia el día siguiente
siguienteDia(): void {
  const nuevaFecha = new Date(this.fechaSeleccionada);
  nuevaFecha.setDate(nuevaFecha.getDate() + 1);
  this.fechaSeleccionada = nuevaFecha.toISOString().split('T')[0];
  this.cargarPartidosDelDia(this.fechaSeleccionada); // Recargar los partidos del día siguiente
}

// Navegar hacia el día anterior
anteriorDia(): void {
  const nuevaFecha = new Date(this.fechaSeleccionada);
  nuevaFecha.setDate(nuevaFecha.getDate() - 1);
  this.fechaSeleccionada = nuevaFecha.toISOString().split('T')[0];
  this.cargarPartidosDelDia(this.fechaSeleccionada); // Recargar los partidos del día anterior
}

// Filtrar partidos por UTC-3 (ajuste de zona horaria)
private filtrarPartidosPorUtc3(partidos: any[], date: string): any[] {
  const startTime = new Date(`${date}T03:00:00Z`).getTime(); // 03:00 UTC hoy
  const endTime = new Date(`${date}T02:59:59Z`).getTime() + 24 * 60 * 60 * 1000; // 02:59 UTC mañana

  return partidos.filter((partido) => {
    const partidoDateUtc = new Date(partido.fixture.date).getTime();
    return partidoDateUtc >= startTime && partidoDateUtc <= endTime;
  });
}

getEstadoPartido(fechaPartido: string, golesHome: number, golesAway: number, status: { long: string, short: string, elapsed: number, extra?: number }): string {
  const fechaPartidoDate = new Date(fechaPartido);
  const fechaActual = new Date();

  // Si el partido no ha comenzado
  if (fechaPartidoDate > fechaActual) {
      return fechaPartidoDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Mostrar el estado del partido según las propiedades del objeto status
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
      return "Estado desconocido";
  }
}
}
 
