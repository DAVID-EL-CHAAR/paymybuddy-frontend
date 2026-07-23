import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { TransferService, TransferHistoryDTO } from '../../core/services/transfer.service';
import { BankAccountService, BankAccountDTO } from '../../core/services/bank-account.service';

@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.scss'
})
export class TransfersComponent implements OnInit {
  direction: 'bankToPmb' | 'pmbToBank' = 'bankToPmb';
  rib = '';
  amount: number | null = null;
  submitting = false;
  errorMessage = '';
  successMessage = '';

  bankAccounts: BankAccountDTO[] = [];
  loadingAccounts = true;

  history: TransferHistoryDTO[] = [];
  currentPage = 1;
  totalPages = 0;
  pageSize = 5;
  loadingHistory = true;

  constructor(
    private transferService: TransferService,
    private bankAccountService: BankAccountService
  ) {}

  ngOnInit(): void {
    this.loadHistory();
    this.loadBankAccounts();
  }

  loadBankAccounts(): void {
    this.loadingAccounts = true;
    this.bankAccountService.list().subscribe({
      next: (accounts) => {
        this.bankAccounts = accounts;
        this.loadingAccounts = false;
      },
      error: () => {
        this.loadingAccounts = false;
      }
    });
  }

  loadHistory(): void {
    this.loadingHistory = true;
    this.transferService.getHistory(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.history = res.content;
        this.totalPages = res.totalPages;
        this.loadingHistory = false;
      },
      error: () => {
        this.loadingHistory = false;
      }
    });
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadHistory();
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onSubmit(): void {
    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const request = { rib: this.rib, amount: this.amount! };
    const action = this.direction === 'bankToPmb'
      ? this.transferService.bankToPmb(request)
      : this.transferService.pmbToBank(request);

    action.subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = 'Transfert effectué avec succès';
        this.rib = '';
        this.amount = null;
        this.currentPage = 1;
        this.loadHistory();
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err.error?.message || 'Une erreur est survenue';
      }
    });
  }
}