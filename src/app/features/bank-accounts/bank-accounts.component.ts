import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BankAccountService, BankAccountDTO } from '../../core/services/bank-account.service';

@Component({
  selector: 'app-bank-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './bank-accounts.component.html',
  styleUrl: './bank-accounts.component.scss'
})
export class BankAccountsComponent implements OnInit {
  accounts: BankAccountDTO[] = [];
  loading = true;

  formVisible = false;
  editingId: number | null = null;
  submitting = false;

  nom = '';
  prenom = '';
  rib = '';
  balance: number | null = null;

  errorMessage = '';
  successMessage = '';

  constructor(private bankAccountService: BankAccountService) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.loading = true;
    this.bankAccountService.list().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger vos comptes bancaires';
        this.loading = false;
      }
    });
  }

  openAddForm(): void {
    this.editingId = null;
    this.nom = '';
    this.prenom = '';
    this.rib = '';
    this.balance = null;
    this.formVisible = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  openEditForm(account: BankAccountDTO): void {
    this.editingId = account.id;
    this.nom = account.nom;
    this.prenom = account.prenom;
    this.rib = account.rib;
    this.balance = account.balance;
    this.formVisible = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelForm(): void {
    this.formVisible = false;
    this.editingId = null;
  }

  onSubmit(): void {
    this.submitting = true;
    this.errorMessage = '';

    const request = { nom: this.nom, prenom: this.prenom, rib: this.rib, balance: this.balance! };

    const action = this.editingId
      ? this.bankAccountService.update(this.editingId, request)
      : this.bankAccountService.add(request);

    action.subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = this.editingId ? 'Compte modifié avec succès' : 'Compte ajouté avec succès';
        this.formVisible = false;
        this.loadAccounts();
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err.error?.message || 'Une erreur est survenue';
      }
    });
  }

  deleteAccount(id: number): void {
    if (!confirm('Supprimer ce compte bancaire ?')) return;

    this.bankAccountService.delete(id).subscribe({
      next: () => {
        this.successMessage = 'Compte supprimé';
        this.loadAccounts();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Suppression impossible';
      }
    });
  }
}