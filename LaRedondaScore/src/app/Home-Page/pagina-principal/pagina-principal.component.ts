import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PartidoService } from '../../Api/partidos.service';
import { CommonModule } from '@angular/common';
import { PartidosComponent } from '../partidos/partidos.component';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';

@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [RouterModule,CommonModule,PartidosComponent,BarraLateralComponent],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent {

}
