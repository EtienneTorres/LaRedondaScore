import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PartidoService } from '../../Api/partidos.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../users-services/user.service';
import { Observable } from 'rxjs';
import { EquiposService } from '../../lista-favoritos/equipos.service';
import { NavComponent } from '../../navbar/nav/nav.component';
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
  userId: number | null = null; // ID del usuario logueado
  message:string='';
  equiposFavoritos: { [key: string]: { nombre: string; imagen: string, } } = {};
  mensaje: string = ''; // Para mostrar mensajes de feedback


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



  cargarEquiposFavoritos(userId: string) {
    this.equipo.getFavoriteTeams(userId).subscribe(
      (favoritos) => {
        this.equiposFavoritos = favoritos; // Almacena el JSON completo de favoritos
        console.log(this.equiposFavoritos); // Muestra el JSON completo en la consola
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
          this.cargarEquiposFavoritos(userId);
        },
        (error) => this.mensaje = 'Error al añadir el equipo a favoritos'
      );
    } else {
      this.mensaje = 'Usuario no encontrado';
    }
  }

  EliminarDeFavoritos(teamName: string): void {
    // Leer el ID del usuario desde localStorage
    const userId = (localStorage.getItem('userId')) ;
    console.log(userId);
    console.log(teamName);
    if (userId) {
      // Llamamos al servicio para agregar el equipo a favoritos
      this.equipo.removeFavoriteTeam(userId, teamName)
        .subscribe(response => {
          console.log('Equipo eliminado de favoritos', response);
        }, error => {
          console.error('Error al eliminar equipo de favoritos', error);
        });
    } else {
      console.warn('Usuario no autenticado');
      // Si el usuario no está autenticado, puedes redirigir a la página de login
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
  
  
}
