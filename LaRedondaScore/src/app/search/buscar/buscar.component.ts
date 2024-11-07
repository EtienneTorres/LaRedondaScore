import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { PartidoService } from '../../Api/partidos.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,RouterLink],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent {


  equipos: any[] = []; // Array para almacenar los equipos
  filteredEquipos: any[] = []; // Equipos filtrados basados en la búsqueda
  searchTerm: string = ''; // Término de búsqueda
  loading: boolean = false; // Indicador de carga

  constructor(private equipoService:PartidoService ) {}

  onInputChange() {
    if (this.searchTerm.length > 2) { // Solo realiza la búsqueda si el término tiene más de 2 caracteres
        this.loading = true;  // Inicia el indicador de carga
        this.equipoService.getEquiposPorNombre(this.searchTerm).subscribe(data => {
          // Asegúrate de que la respuesta tenga la propiedad 'response' y contiene los equipos
          if (data && data.response && data.response.length > 0) {
            // Accede al equipo desde 'data.response[0].team'
            this.filteredEquipos = data.response.map((item: any) => item.team); // Extrae solo los equipos
            console.log(this.filteredEquipos);  // Verifica que los equipos se están asignando correctamente
          } else {
            this.filteredEquipos = []; // Si no se encuentran equipos, limpia la lista
          }
          this.loading = false; // Detiene el indicador de carga
        }, error => {
          console.error('Error al buscar equipos', error);
          this.loading = false; // Detiene el indicador de carga en caso de error
        });
      } else {
        this.filteredEquipos = []; // Limpia la lista si el término es demasiado corto
        this.loading = false; // Asegúrate de desactivar el indicador de carga
      }
    }

}
