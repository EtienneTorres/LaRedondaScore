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
  
  

}
