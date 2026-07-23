import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AccountService, AccountDTO } from '../../core/services/account.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  activated = false;
  account: AccountDTO | null = null;

  loading = true;
  activating = false;
  errorMessage = '';
  successMessage = '';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadAccount();
  }

  loadAccount(): void {
    this.loading = true;
    this.accountService.getAccount().subscribe({
      next: (res) => {
        this.activated = res.activated;
        this.account = res.account || null;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger votre profil';
        this.loading = false;
      }
    });
  }

  activate(): void {
    this.activating = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.accountService.activateAccount().subscribe({
      next: () => {
        this.activating = false;
        this.successMessage = 'Compte PayMyBuddy activé avec succès';
        this.loadAccount();
      },
      error: (err) => {
        this.activating = false;
        this.errorMessage = err.error?.message || 'Une erreur est survenue';
      }
    });
  }

  initials(nom: string): string {
    return nom ? nom.charAt(0).toUpperCase() : '?';
  }
}