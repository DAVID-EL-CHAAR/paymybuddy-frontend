import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-add-friend',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.scss'
})
export class AddFriendComponent {
  friendEmail = '';
  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true;

    const params = new URLSearchParams({ friendEmail: this.friendEmail }).toString();

    this.http.post(`/api/addFriend?${params}`, {}).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Ami ajouté avec succès';
        this.friendEmail = '';
        setTimeout(() => this.router.navigate(['/home']), 1200);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || err.error || 'Impossible d\'ajouter cet ami';
      }
    });
  }
}