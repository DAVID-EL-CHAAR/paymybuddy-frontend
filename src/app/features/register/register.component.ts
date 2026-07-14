import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  nom = '';
  prenom = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

onSubmit(): void {
  this.errorMessage = '';
  this.successMessage = '';

  this.authService.register({
    nom: this.nom,
    prenom: this.prenom,
    email: this.email,
    password: this.password
  }).subscribe({
    next: () => {
      this.successMessage = 'Compte créé avec succès';
      setTimeout(() => this.router.navigate(['/login']), 1200);
    },
    error: (err) => {
      this.errorMessage = err.error?.message || 'Une erreur est survenue';
    }
  });
}
}