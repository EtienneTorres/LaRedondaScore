import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PartidoService } from '../../../Api/partidos.service'; // Ajusta la ruta a tu servicio

@Component({
  selector: 'app-detalle-league',
  standalone: true,
  templateUrl: './detalle-league.component.html',
  imports: [RouterModule,CommonModule],
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


  constructor(
    private partidoService: PartidoService, // Servicio para interactuar con la API
    private route: ActivatedRoute // Para obtener el id de la liga desde la ruta
  ) {}

  ngOnInit() {
    this.leagueId = this.route.snapshot.paramMap.get('id');
    if (this.leagueId) {
      console.log(this.leagueId);
      this.loadMatches();
      this.loadLeagueDetails(this.leagueId);
      this.loadSeasonStats(this.leagueId);
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

  
  loadSeasonStats(id: string) {
    this.partidoService.getSeasonStats(id).subscribe((data: any) => {
      if (data.response && data.response.length > 0) {
        this.seasonStats = data.response[0];  // Asignar la respuesta
        console.log('Datos de la liga:', this.seasonStats);
      } else {
        console.log('No se encontraron datos para esta liga');
      }
    }, error => {
      console.error('Error al cargar las estadísticas de la temporada:', error);
    });
  }
  
  loadMatches(): void {
    // Asegúrate de que `leagueId` no sea null y sea un número
    const validLeagueId = this.leagueId ? Number(this.leagueId) : null;
    const season = this.currentSeason.toString();  // Utiliza currentSeason para la temporada actual  
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
  
  
  changeSeason(direction: number) {
    const newSeason = this.currentSeason + direction;

    // Asegúrate de que la nueva temporada esté dentro del rango permitido
    if (newSeason >= this.minSeason && newSeason <= this.maxSeason) {
      this.currentSeason = newSeason;
      this.loadMatches(); // Llamar a la API con la nueva temporada
    }
  }

  

}
