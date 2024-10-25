import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PartidoService } from '../../Api/partidos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent implements OnInit {

  partidos: any[] = [];

  constructor(private partidoService: PartidoService) {}

ngOnInit(): void {
  const fechaHoy = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    this.cargarPartidosDelDia(fechaHoy);
}

cargarPartidosDelDia(date: string): void {
  this.partidoService.getPartidosDelDia(date).subscribe(
    (data) => {
      this.partidos = data.response; // Ajusta según la estructura de la respuesta
    },
    (error) => {
      console.error('Error al cargar partidos:', error);
    }
  );
}

}
