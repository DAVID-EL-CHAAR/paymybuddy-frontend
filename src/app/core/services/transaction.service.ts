import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SendMoneyRequest {
  recipientEmail: string;
  amount: number;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = '/api/transactions';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/contacts`);
  }

  sendMoney(request: SendMoneyRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, request);
  }
}