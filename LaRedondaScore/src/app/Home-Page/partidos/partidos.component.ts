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


 // Array de ligas que deseas mostrar
 // Array de ligas que deseas mostrar, incluyendo el país
ligasDeseadas: { name: string; country: string }[] = [
  { name: "Premier League", country: "England" },
  { name: "Serie A", country: "Italy" },
  { name: "Liga Profesional Argentina", country: "Argentina" },
  { name: "La Liga", country: "Spain" },
  { name: "Bundesliga", country: "Germany" },
  { name: "Ligue 1", country: "France" },
  { name: "Conmebol Sudamericana", country: "South America" },
  { name: "Eredivisie", country: "Netherlands" },
  { name: "Primeira Liga", country: "Portugal" },
  { name: "World Cup", country: "International" }, // Mundial no tiene un país específico
  { name: "Ligue 2", country: "France" },
  { name: "UEFA Champions League", country: "International" }, // Champions League es un torneo internacional
  { name: "Primera B Metropolitana", country: "Argentina" },
  { name: "Copa De La Liga Profesional", country: "Argentina" },
  { name: "Copa Argentina", country: "Argentina" },
  { name: "Torneo Federal A", country: "Argentina" },
  { name: "Primera D", country: "Argentina" },
  { name: "Primera C", country: "Argentina" },
  { name: "Primera Nacional", country: "Argentina" },
  { name: "Primera B Metropolitana", country: "Argentina" }
];



  
    constructor(private partidoService: PartidoService) {}
  
  ngOnInit(): void {

    const fechaHoy = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    //  const fechaHoy = new Date().toLocaleDateString('en-CA'); // Formato YYYY-MM-DD
      this.cargarPartidosDelDia(fechaHoy);
  
}

  cargarPartidosDelDia(date: string): void {

    this.partidoService.getPartidosDelDia(date).subscribe(
      (data) => {
        const partidos = data.response; // Ajusta según la estructura de la respuesta
        


        // Agrupamos los partidos por liga
        this.partidosPorLiga = partidos.reduce((acc: any, partido: any) => {
          const ligaNombre = partido.league.name; // Ajusta según la propiedad de la liga
          const paisNombre = partido.league.country; 


 // Crear una clave única combinando el nombre de la liga y el país
 const ligaClave = `${ligaNombre} (${paisNombre})`;

  // Solo agregamos partidos de ligas deseadas
  const ligaDeseada = this.ligasDeseadas.find(liga => 
    liga.name === ligaNombre && liga.country === paisNombre
  );

  if (ligaDeseada) {
    if (!acc[ligaClave]) {
      acc[ligaClave] = []; // Inicializa el array si no existe
    }
    acc[ligaClave].push(partido); // Agrega el partido a la liga correspondiente
  }
  return acc;
}, {});
},
(error) => {
console.error('Error al cargar partidos:', error);
}
);
}
}