import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PartidoService } from '../../Api/partidos.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../users-services/user.service';
import { EquiposService } from '../../lista-favoritos/equipos.service';
import { Nav2Component } from '../../navbar/nav2/nav2.component';

@Component({
  selector: 'app-ficha-equipo',
  standalone: true,
  imports: [RouterModule,CommonModule,Nav2Component],
  templateUrl: './ficha-equipo.component.html',
  styleUrl: './ficha-equipo.component.css'
})
export class FichaEquipoComponent implements OnInit {


  teamName: string = ''; // Nombre del equipo a mostrar
  equipoDetails: any = {}; // Detalles del equipo que obtendremos de la API
  userId: string | null = null; // ID del usuario logueado
  message:string='';
  equiposFavoritos: { [key: string]: { nombre: string; imagen: string, } } = {};
  mensaje: string = ''; // Para mostrar mensajes de feedback
  isFavorite: boolean = false; // Indica si el equipo ya es favorito



  constructor(
    private route: ActivatedRoute, // Para acceder a los parámetros de la ruta
    private partidoService: PartidoService ,// Servicio para obtener los detalles del equipo
    private user:UserService,
    private equipo:EquiposService
  ) {}
  

  ngOnInit(): void {
    
    this.userId = localStorage.getItem('userId');
    console.log( this.userId);
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


    if (this.userId) {
      this.cargarEquiposFavoritos(this.userId);
    }

  }

  getEquipoDetails(teamName: string): void {
    this.partidoService.getEquiposPorNombre(teamName).subscribe(
      data => {
        if (data && data.response && data.response.length > 0) {
          this.equipoDetails = data.response[0];
          this.checkIfFavorite();
        }
      },
      error => {
        console.error('Error al obtener detalles del equipo', error);
      }
    );
  }



  cargarEquiposFavoritos(userId: string) {
    this.equipo.getFavoriteTeams(userId).subscribe(
      (favoritos) => {
        this.equiposFavoritos = favoritos;
        this.isFavorite = !!this.equiposFavoritos[this.teamName]; // Verifica si el equipo actual es favorito
      },
      (error) => {
        this.mensaje = 'Error al cargar los equipos favoritos';
        console.error(error);
      }
    );
  }

  agregarEquipoAFavoritos(teamName: string, teamImage: string) {
    const userId = (localStorage.getItem('userId'));
    console.log(userId);
    if (userId) {
      this.equipo.addFavoriteTeam(userId, teamName, teamImage).subscribe(
        (response) => {
          this.mensaje = response.message || 'Equipo añadido a favoritos';
          this.isFavorite = true;
          this.cargarEquiposFavoritos(userId);
        },
        (error) => this.mensaje = 'Error al añadir el equipo a favoritos'
      );
    } else {
      this.mensaje = 'Usuario no encontrado';
    }
  }


  mostrarFavoritos(): void {
    const userId = (localStorage.getItem('userId'));
    
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


  checkIfFavorite() {
    if (this.equipoDetails?.team?.name && this.equiposFavoritos) {
      const equipoName = this.equipoDetails.team.name;
      this.isFavorite = Object.values(this.equiposFavoritos).some(
        fav => fav.nombre.toLowerCase() === equipoName.toLowerCase()
      );
      console.log(`¿Es favorito?: ${this.isFavorite}`);
    }
  }

}