import { UserService } from './../../users-services/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { RegisterPageComponent } from '../register-page/register-page.component';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  
 // Variables para capturar el username y password del formulario
 username: string = '';
 password: string = '';
 errorMessage: string = '';  // Mensaje de error en caso de login fallido

 constructor(private userService: UserService, private router: Router) { }

 // Método que se ejecuta al enviar el formulario
login() {
  // Llamamos al servicio de login
  this.userService.login(this.username, this.password).subscribe(
    (response) => {
      // Verificamos que la respuesta no esté vacía
      if (response && response.length > 0) {
        const user = response[0]; // Suponiendo que la respuesta es un arreglo con un único usuario

        // Guardamos el ID del usuario en localStorage
        localStorage.setItem('userId', user.id);  // Guarda el ID del usuario en localStorage

        console.log('Login exitoso', response);
        this.router.navigate(['/PaginaPrincipal']);  // Redirige a la página principal o dashboard
      } else {
        // Si el login no es exitoso
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    },
    (error) => {
      // En caso de error en la solicitud
      this.errorMessage = 'Hubo un problema al intentar iniciar sesión';
      console.error('Error en el login:', error);
    }
  );
}


 openRegisterWindow() {
  window.open(
    '/register',  // La ruta donde tienes el componente de registro
    'Registro',   // Nombre de la ventana
    'width=400,height=500,left=100,top=100'  // Tamaño y posición
  );
}



}
