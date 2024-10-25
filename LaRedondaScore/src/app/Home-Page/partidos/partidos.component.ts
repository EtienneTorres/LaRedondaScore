import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {OnInit } from '@angular/core';
import { PartidoService } from '../../Api/partidos.service';


@Component({
  selector: 'app-partidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partidos.component.html',
  styleUrl: './partidos.component.css'
})
 export class PartidosComponent  /*implements OnInit*/ {

    
     // Propiedad para almacenar los partidos organizados por liga
  partidosPorLiga: { [liga: string]: any[] } = {};
  
    constructor(private partidoService: PartidoService) {}
  
  ngOnInit(): void {
    const fechaHoy = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
      this.cargarPartidosDelDia(fechaHoy);
  }
  
  cargarPartidosDelDia(date: string): void {
    this.partidoService.getPartidosDelDia(date).subscribe(
      (data) => {
        const partidos = data.response; // Ajusta según la estructura de la respuesta
        
        // Agrupamos los partidos por liga
        this.partidosPorLiga = partidos.reduce((acc: any, partido: any) => {
          const ligaNombre = partido.league.name; // Ajusta según la propiedad de la liga
          
          if (!acc[ligaNombre]) {
            acc[ligaNombre] = []; // Inicializa el array si no existe
          }
          acc[ligaNombre].push(partido); // Agrega el partido a la liga correspondiente
          return acc;
        }, {});
      },
      (error) => {
        console.error('Error al cargar partidos:', error);
      }
    );
  }
}