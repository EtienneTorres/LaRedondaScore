import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PartidoService } from '../../../Services/Api/partidos.service';
import { TablaComponent } from "./tabla/tabla.component"; 
import { Nav2Component } from '../../../navbar/nav2/nav2.component';

@Component({
  selector: 'app-detalle-league',
  standalone: true,
  templateUrl: './detalle-league.component.html',
  imports: [RouterModule, CommonModule, TablaComponent,Nav2Component],
  styleUrls: ['./detalle-league.component.css']
})
export class DetallesLeagueComponent implements OnInit {

  league: any = {}; // Guarda los detalles de la liga
  seasonStats: any = {}; // Guarda las estadísticas de la temporada, inicialmente null
  leagueId: string | null = null;
  matches: any[] = []; // Declara la propiedad matches como un array
  partidos: any[] = [];
  currentSeason: number = 2022; // Temporada inicial, puedes ajustarlo si es necesario
  minSeason: number = 2015; // Temporada mínima
  maxSeason: number = 2022; // Temporada máxima

  // Constructor
  constructor(
    private partidoService: PartidoService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.leagueId = this.route.snapshot.paramMap.get('id'); // Obtenemos el ID de la liga desde la ruta
    if (this.leagueId) {
      console.log(this.leagueId);
      this.loadMatches(); // Cargamos los partidos
      this.loadLeagueDetails(this.leagueId); // Cargamos los detalles de la liga 
      this.loadSeasonStats(this.leagueId); // Cargamos las estadisticas por temporada de la liga
    }
  }

  // Método para cargar los detalles de la liga
  loadLeagueDetails(id: string) {
    this.partidoService.getLeagueDetails(id).subscribe((data: any) => {
      this.league = data.response[0]; // Asegúrate de acceder al dato correctamente
      console.log('Datos de la liga load:', this.league);
    }, error => {
      console.error('Error al cargar los detalles de la liga:', error);
    });
  }

    // Metodo para cargar las estadisticas por temporada de una liga
  loadSeasonStats(id: string) {
    this.partidoService.getSeasonStats(id).subscribe((data: any) => {
      if (data.response && data.response.length > 0) {
        this.seasonStats = data.response[0]; 
        console.log('Datos de la liga:', this.seasonStats);
      } else {
        console.log('No se encontraron datos para esta liga');
      }
    }, error => {
      console.error('Error al cargar las estadísticas de la temporada:', error);
    });
  }
  
  // Metodo para cargar los partidos
  loadMatches(): void {
    // Asegúrate de que `leagueId` no sea null y sea un número
    const validLeagueId = this.leagueId ? Number(this.leagueId) : null;
    const season = this.currentSeason.toString(); 
    if (validLeagueId && season) {
      this.partidoService.getPartidosPorLiga(validLeagueId, season).subscribe(
        data => {
          console.log('Respuesta de la API:', data);
          if (data.response && data.response.length > 0) {
            this.partidos = data.response;
            console.log('Partidos de la liga:', this.partidos);
          } else {
            console.warn('No hay partidos disponibles para esta liga.');
            this.partidos = [];
          }
        },
        error => {
          console.error('Error al cargar los partidos:', error);
        }
      );
    } else {
      console.error('El id de la liga o la temporada no es válido.');
    }
  }
  
  // Metodo para cambiar de temporada
  changeSeason(direction: number) {
    const newSeason = this.currentSeason + direction;

    // Asegúrate de que la nueva temporada esté dentro del rango permitido
    if (newSeason >= this.minSeason && newSeason <= this.maxSeason) {
      this.currentSeason = newSeason;
      this.loadMatches(); // Cargamos los partidos de la nueva temporada
    }
  }

  

}
