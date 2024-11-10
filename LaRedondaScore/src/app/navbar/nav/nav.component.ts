import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { BuscarComponent } from '../../search/buscar/buscar.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterModule, BuscarComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
