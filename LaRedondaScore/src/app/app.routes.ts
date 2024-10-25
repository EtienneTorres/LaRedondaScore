import { Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './Home-Page/pagina-principal/pagina-principal.component';
import { LoginPageComponent } from './Login/login-page/login-page.component';

export const routes: Routes = [
    { path: 'login-page', component: LoginPageComponent }, // Página de inicio
    { path: 'PaginaPrincipal', component: PaginaPrincipalComponent }, // Ruta al nuevo componente
    { path: '**', redirectTo: 'login-page' } // Redirige cualquier otra ruta a la página de inicio
];


