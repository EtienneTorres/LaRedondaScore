import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PartidoService } from '../../Api/partidos.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../users-services/user.service';
import { Observable } from 'rxjs';
import { EquiposService } from '../../lista-favoritos/equipos.service';
import { NavComponent } from '../../navbar/nav/nav.component';

@Component({
  selector: 'app-ficha-equipo',
  standalone: true,
  imports: [RouterModule,CommonModule,NavComponent],
  templateUrl: './ficha-equipo.component.html',
  styleUrl: './ficha-equipo.component.css'
})
export class FichaEquipoComponent implements OnInit {


  teamName: string = ''; // Nombre del equipo a mostrar
  equipoDetails: any = {}; // Detalles del equipo que obtendremos de la API
  userId: number | null = null; // ID del usuario logueado
  message:string='';

  constructor(
    private route: ActivatedRoute, // Para acceder a los parámetros de la ruta
    private partidoService: PartidoService ,// Servicio para obtener los detalles del equipo
    private user:UserService,
    private equipo:EquiposService
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

    this.userId = this.equipo.getUserId();
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

  agregarAFavoritos(teamName: string, teamLogo: string): void {
    // Leer el ID del usuario desde localStorage
    const userId = Number(localStorage.getItem('userId')) ;
    console.log(userId);
    console.log(teamName);
    if (userId) {
      // Llamamos al servicio para agregar el equipo a favoritos
      this.equipo.addFavoriteTeam(userId, teamName,teamLogo)
        .subscribe(response => {
          console.log('Equipo agregado a favoritos', response);
        }, error => {
          console.error('Error al agregar equipo a favoritos', error);
        });
    } else {
      console.warn('Usuario no autenticado');
      // Si el usuario no está autenticado, puedes redirigir a la página de login
    }
  }
  

  mostrarFavoritos(): void {
    const userId = Number(localStorage.getItem('userId'));
    
    if (userId) {
      this.equipo.getFavoriteTeams(userId).subscribe(
        (favoritos) => {
          if (Object.keys(favoritos).length > 0) { // Verifica si hay equipos favoritos
            console.log('Equipos favoritos:', favoritos);
          } else {
            console.log('No tiene equipos favoritos');
          }
        },
        (error) => {
          console.error('Error al obtener los favoritos', error);
        }
      );
    } else {
      console.warn('Usuario no autenticado');
    }
  }
  
  
}
