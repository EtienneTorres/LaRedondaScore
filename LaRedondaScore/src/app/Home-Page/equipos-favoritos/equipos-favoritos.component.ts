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



  equiposFavoritos: string[] = []; 
  mensaje: string = ''; // Para mostrar mensajes de feedback

  constructor(private equiposService: EquiposService) {}

  ngOnInit(): void {
    const userId = this.equiposService.getUserId(); // Obtén el ID de usuario actual
    if (userId) {
      this.cargarEquiposFavoritos(userId);
    }
  }

  cargarEquiposFavoritos(userId: number) {
    this.equiposService.getFavoriteTeams(userId).subscribe(
      (favoritos) => {
        // Asumiendo que 'favoritos' es un array con el formato que compartiste
        // Extraemos los nombres de los equipos
        const equipos = favoritos[0].equipos; // 'equipos' es un objeto
        this.equiposFavoritos = Object.values(equipos); // Obtener los nombres de los equipos
      },
      (error) => this.mensaje = 'Error al cargar los equipos favoritos'
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
