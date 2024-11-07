import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PartidoService } from '../../Api/partidos.service';
import { CommonModule } from '@angular/common';
import { PartidosComponent } from '../partidos/partidos.component';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { NavComponent } from '../../navbar/nav/nav.component';
import { BuscarComponent } from '../../search/buscar/buscar.component';
import { LoginPageComponent } from "../../Login/login-page/login-page.component";

@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [RouterModule, CommonModule, PartidosComponent, BarraLateralComponent, NavComponent, BuscarComponent, LoginPageComponent],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent {

}
