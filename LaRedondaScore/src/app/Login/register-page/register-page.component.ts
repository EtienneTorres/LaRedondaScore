import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/users-services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  username: string = ''; // Nombre de usuario
  password: string = ''; // Contraseña
  message: string = ''; // Mensaje de error
  successMessage: string = ''; // Mensaje de éxito

  // Constructor 
  constructor(private user: UserService, private router: Router) {}

  // Método para registrar a un nuevo usuario
  onRegister(): void {
    this.user.register(this.username, this.password).subscribe(
      response => {
        console.log('Registro exitoso', response);
        this.successMessage = 'Usuario registrado con éxito';

        // Oculta el mensaje después de 4 segundos y redirige a login
        setTimeout(() => {
          this.successMessage = '';
          window.close();
        }, 1000);
      },
      error => {
        console.error('Error en el registro', error);
        this.message = 'Error en el registro. Intente de nuevo.';

        // Oculta el mensaje de error después de unos segundos
        setTimeout(() => {
          this.message = '';
        }, 4000);
      }
    );
  }
}
