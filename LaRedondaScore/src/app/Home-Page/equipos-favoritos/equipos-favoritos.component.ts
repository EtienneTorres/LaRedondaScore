import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../../lista-favoritos/equipos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipos-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipos-favoritos.component.html',
  styleUrl: './equipos-favoritos.component.css'
})
export class EquiposFavoritosComponent implements OnInit {


  currentUserId: number | null = 1; // Asignar un ID predeterminado para pruebas
  equiposFavoritos: string[] = []; 
  mensaje: string = ''; // Para mostrar mensajes de feedback

  constructor(private equiposService: EquiposService) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (userId !== null) {
      this.cargarEquiposFavoritos(userId);
    } else {
      this.mensaje = 'Usuario no encontrado';
      console.error('El ID de usuario no está disponible.');
    }
  }
  

  cargarEquiposFavoritos(userId: number) {
    this.equiposService.getFavoriteTeams(userId).subscribe(
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
  


  agregarEquipoAFavoritos(teamName: string) {
    const userId = this.equiposService.getUserId();
    if (userId) {
      this.equiposService.addFavoriteTeam(userId, teamName).subscribe(
        (response) => {
          this.mensaje = response.message || 'Equipo añadido a favoritos';
          this.cargarEquiposFavoritos(userId); // Recargar la lista de favoritos
        },
        (error) => this.mensaje = 'Error al añadir el equipo a favoritos'
      );
    } else {
      this.mensaje = 'Usuario no encontrado';
    }
  }


}
