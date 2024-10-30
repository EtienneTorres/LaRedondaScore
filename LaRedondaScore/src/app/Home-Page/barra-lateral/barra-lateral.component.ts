import { Component, Injectable, OnInit } from '@angular/core';
import { PartidoService } from '../../Api/partidos.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './barra-lateral.component.html',
  styleUrl: './barra-lateral.component.css'
})



export class BarraLateralComponent implements OnInit {

  countries: any[] = [];
  leagues: any[] = [];
  matches: any[] = [];
  selectedCountryId: string | null = null;

  constructor(private partido: PartidoService) {}
  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() { 
    this.partido.getCountries().subscribe(data => {
      console.log(data);
      const allCountries = data.response; // Asegúrate de que esto contenga el formato correcto
      this.countries = allCountries.filter((country: any) => 
        this.PaisesDeseados.some(p => p.country === country.name) // Asegúrate de que `country.name` sea la propiedad correcta
      );
    }, error => {
      console.error('Error al cargar los países:', error);
    });
}

  // Array de ligas que deseas mostrar
 // Array de ligas que deseas mostrar, incluyendo el país
PaisesDeseados: {country: string }[] = [
  {country: "England" },
  {country: "Italy" },
  {country: "Argentina" },
  {country: "Spain" },
  {country: "Germany" },
  {country: "France" },
  {country: "South America" },
  {country: "Netherlands" },
  {country: "Portugal" },
  {country: "International" }, // Mundial no tiene un país específico // Champions League es un torneo internacional
  {country: "World" }
];

}
