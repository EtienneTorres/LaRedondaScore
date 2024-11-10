import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../../lista-favoritos/equipos.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipos-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipos-favoritos.component.html',
  styleUrl: './equipos-favoritos.component.css'
})
export class EquiposFavoritosComponent implements OnInit {


  currentUserId: number | null = 1; // Asignar un ID predeterminado para pruebas
  equiposFavoritos: { [key: string]: { nombre: string; imagen: string } } = {};
  mensaje: string = ''; // Para mostrar mensajes de feedback

  constructor(private equiposService: EquiposService,private router: Router) {}


  ngOnInit(): void {
    const userId = (localStorage.getItem('userId'));
    if (userId !== null) {
      this.cargarEquiposFavoritos(userId);
    } else {
      this.mensaje = 'Usuario no encontrado';
      console.error('El ID de usuario no está disponible.');
    }
  }
  

  cargarEquiposFavoritos(userId: string) {
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
  




eliminarEquipo(teamName: string) {
  const userId = (localStorage.getItem('userId'));
  if (userId) {
    this.equiposService.removeFavoriteTeam(userId, teamName).subscribe(
      (response) => {
        this.mensaje = response.message || 'Equipo eliminado de favoritos';
        this.cargarEquiposFavoritos(userId); // Recargar los favoritos después de la eliminación
      },
      (error) => {
        this.mensaje = 'Error al eliminar el equipo de favoritos';
        console.error(error);
      }
    );
  } else {
    this.mensaje = 'Usuario no encontrado';
  }
}


// Método para redirigir a otro componente
irAEquipo(nombre: string) {
  // Redirigir a la ruta del equipo usando su nombre o cualquier otro identificador
  this.router.navigate([`/ficha-equipo/${nombre}`]);
}






}
