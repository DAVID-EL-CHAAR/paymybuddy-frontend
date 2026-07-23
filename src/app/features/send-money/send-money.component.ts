import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { TransactionService } from '../../core/services/transaction.service';

@Component({
  selector: 'app-send-money',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './send-money.component.html',
  styleUrl: './send-money.component.scss'
})
export class SendMoneyComponent implements OnInit {
  contacts: string[] = [];
  recipientEmail = '';
  amount: number | null = null;
  description = '';

  loadingContacts = true;
  sending = false;
  successMessage = '';
  errorMessage = '';

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getContacts().subscribe({
      next: (emails) => {
        this.contacts = emails;
        this.loadingContacts = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger vos contacts';
        this.loadingContacts = false;
      }
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.sending = true;

    this.transactionService.sendMoney({
      recipientEmail: this.recipientEmail,
      amount: this.amount!,
      description: this.description
    }).subscribe({
      next: () => {
        this.sending = false;
        this.successMessage = 'Transaction effectuée avec succès';
        this.recipientEmail = '';
        this.amount = null;
        this.description = '';
      },
      error: (err) => {
        this.sending = false;
        this.errorMessage = err.error?.message || 'Une erreur est survenue';
      }
    });
  }
}