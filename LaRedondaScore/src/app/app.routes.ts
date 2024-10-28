import { Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './Home-Page/pagina-principal/pagina-principal.component';
import { LoginPageComponent } from './Login/login-page/login-page.component';
import { FichaPartidoComponent } from './Home-Page/partidos/ficha-partido/ficha-partido.component';

export const routes: Routes = [
    { path: 'login-page', component: LoginPageComponent }, // Página de inicio
    { path: 'PaginaPrincipal', component: PaginaPrincipalComponent }, // Ruta al nuevo componente
    { path: 'fichapartido/:id', component: FichaPartidoComponent },
    { path: '**', redirectTo: 'login-page' }// Redirige cualquier otra ruta a la página de inicio
];


