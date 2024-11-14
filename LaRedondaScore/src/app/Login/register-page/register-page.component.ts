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
  errorMessage: string = '';

  // Constructor 
  constructor(private user: UserService, private router: Router) {}

 // Método para registrar un nuevo usuario
 onRegister(): void {
  this.user.register(this.username, this.password).subscribe(
    response => {
      console.log('Registro exitoso', response);
      this.successMessage = 'Usuario registrado con éxito';

      // Oculta el mensaje después de 1 segundo y cierra la ventana
      setTimeout(() => {
        this.successMessage = '';
        window.close();
      }, 1000);
    },
    error => {
      if (error.message === 'El usuario ya existe') {
        this.errorMessage = 'El nombre de usuario ya está registrado. Intenta con otro.';
      } else {
        this.errorMessage = 'Error en el registro. Intenta de nuevo.';
      }

    }
  );
}
}
