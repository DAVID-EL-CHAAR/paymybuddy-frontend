import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BankAccountDTO {
  id: number;
  nom: string;
  prenom: string;
  rib: string;
  balance: number;
}

export interface BankAccountRequest {
  rib: string;
  balance: number;
  nom: string;
  prenom: string;
}

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  private apiUrl = '/api/bank-accounts';

  constructor(private http: HttpClient) {}

  list(): Observable<BankAccountDTO[]> {
    return this.http.get<BankAccountDTO[]>(this.apiUrl);
  }

  add(request: BankAccountRequest): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  update(id: number, request: BankAccountRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}