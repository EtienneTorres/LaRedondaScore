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

  constructor(
    private partidoService: PartidoService, // Servicio para interactuar con la API
    private route: ActivatedRoute // Para obtener el id de la liga desde la ruta
  ) {}

  ngOnInit() {
    // Obtener el id de la liga desde la URL
    this.route.paramMap.subscribe(params => {
      this.leagueId = params.get('id');
      if (this.leagueId) {
        this.loadLeagueDetails(this.leagueId); // Cargar los detalles de la liga
        this.loadSeasonStats(this.leagueId); // Cargar las estadísticas de la temporada
      }
    });
  }

  // Método para cargar los detalles de la liga
  loadLeagueDetails(id: string) {
    this.partidoService.getLeagueDetails(id).subscribe((data: any) => {
      this.league = data.response[0]; // Asegúrate de acceder al dato correctamente
      console.log('Datos de la liga:', this.league);
    }, error => {
      console.error('Error al cargar los detalles de la liga:', error);
    });
  }

  // Método para cargar las estadísticas de la temporada (2024)
  loadSeasonStats(id: string) {
    const seasonYear = 2020; // Definir el año de la temporada, en este caso 2024
    this.partidoService.getSeasonStats(id, seasonYear).subscribe((data: any) => {
      console.log(this.seasonStats)
      this.seasonStats = data.response[0]; // Asegúrate de acceder correctamente
      console.log('Estadísticas de la temporada:', this.seasonStats);
    }, error => {
      console.error('Error al cargar las estadísticas de la temporada:', error);
    });
  }
}
