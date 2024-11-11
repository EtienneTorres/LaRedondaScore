import { Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './Home-Page/pagina-principal/pagina-principal.component';
import { LoginPageComponent } from './Login/login-page/login-page.component';
import { FichaPartidoComponent } from './Home-Page/partidos/ficha-partido/ficha-partido.component';
import { FichaEquipoComponent } from './search/ficha-equipo/ficha-equipo.component';
import { RegisterPageComponent } from './Login/register-page/register-page.component';
import { DetallesLeagueComponent } from './Home-Page/barra-lateral/detalle-league/detalle-league.component';
import { FichaPlayerComponent } from './search/ficha-player/ficha-player.component';

export const routes: Routes = [
    { path: 'login-page', component: LoginPageComponent }, // Página de inicio
    { path: 'PaginaPrincipal', component: PaginaPrincipalComponent }, // Ruta al nuevo componente
    { path: 'ficha-partido/:id', component: FichaPartidoComponent },
    { path: 'ficha-equipo/:id', component: FichaEquipoComponent },// Ruta para ficha del equipo
    { path: 'register', component: RegisterPageComponent }, // Ruta para el registro
    { path: 'detalle-league/:id', component: DetallesLeagueComponent },// Ruta para ficha del equipo
    { path: 'ficha-player/:id', component: FichaPlayerComponent }, // Ruta para ficha del player


    { path: '**', redirectTo: 'login-page' }// Redirige cualquier otra ruta a la página de inicio
];


