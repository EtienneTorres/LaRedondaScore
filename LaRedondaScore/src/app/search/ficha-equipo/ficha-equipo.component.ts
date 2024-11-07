import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidoService } from '../../Api/partidos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ficha-equipo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ficha-equipo.component.html',
  styleUrl: './ficha-equipo.component.css'
})
export class FichaEquipoComponent implements OnInit {


  teamName: string = ''; // Nombre del equipo a mostrar
  equipoDetails: any = {}; // Detalles del equipo que obtendremos de la API

  constructor(
    private route: ActivatedRoute, // Para acceder a los parámetros de la ruta
    private partidoService: PartidoService // Servicio para obtener los detalles del equipo
  ) {}

  ngOnInit(): void {
    // Obtener el nombre del equipo desde la URL
    this.route.paramMap.subscribe(params => {
      this.teamName = params.get('teamName') || ''; // Obtiene el parámetro 'teamName' de la URL
      console.log(this.teamName);

      if (this.teamName) {
        // Llama a la API para obtener los detalles del equipo
        this.getEquipoDetails(this.teamName);
        console.log(this.teamName);
      }
    });
  }

  getEquipoDetails(teamName: string): void {
    this.partidoService.getEquiposPorNombre(teamName).subscribe(data => {
      if (data && data.response && data.response.length > 0) {
        this.equipoDetails = data.response[0]; // Asume que 'team' contiene los detalles del equipo
        console.log(this.equipoDetails);
      }
    }, error => {
      console.error('Error al obtener detalles del equipo', error);
    });
  }
}
