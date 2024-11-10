import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/users-services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  username: string = ''; // Nombre de usuario
  password: string = ''; // Contrasena
  message: string = '';

  // Constructor 
  constructor(private user : UserService, private router: Router) {}

  // Metodo para registrar a un nuevo usuario
  onRegister(): void {
    this.user.register(this.username, this.password).subscribe(
      response => {
        console.log('Registro exitoso', response);
        alert('Usuario registrado con éxito');

        setTimeout(() => {
          // Cierra la ventana de registro
          window.close();
        }, 4000);
  
        // Redirige a la página de login
        this.router.navigate(['/login-page']);
  
        // Cierra la ventana o pestaña actual
        window.close();
      },
      error => {
        console.error('Error en el registro', error);
        this.message = 'Error en el registro. Intente de nuevo.';
      }
    );
  }
  
}
