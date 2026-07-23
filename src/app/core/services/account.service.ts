import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AccountDTO {
  nom: string;
  prenom: string;
  email: string;
  balance: number;
}

export interface AccountResponse {
  activated: boolean;
  account?: AccountDTO;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = '/api/pmb';

  constructor(private http: HttpClient) {}

  getAccount(): Observable<AccountResponse> {
    return this.http.get<AccountResponse>(`${this.apiUrl}/account`);
  }

  activateAccount(): Observable<any> {
    return this.http.post(`${this.apiUrl}/activate`, {});
  }
}