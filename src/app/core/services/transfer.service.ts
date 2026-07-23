import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TransferRequest {
  rib: string;
  amount: number;
}

export interface TransferHistoryDTO {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferDate: string;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number; // page actuelle, 0-based
}

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private apiUrl = '/api/transfers';

  constructor(private http: HttpClient) {}

  bankToPmb(request: TransferRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/bank-to-pmb`, request);
  }

  pmbToBank(request: TransferRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/pmb-to-bank`, request);
  }

  getHistory(page: number, size: number): Observable<PageResponse<TransferHistoryDTO>> {
    return this.http.get<PageResponse<TransferHistoryDTO>>(`${this.apiUrl}/history?page=${page}&size=${size}`);
  }
}