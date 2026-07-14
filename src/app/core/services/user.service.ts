import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
}

export interface Friend {
  email: string;
  nom?: string;
  prenom?: string;
}

export interface HomeData {
  user: User;
  friends: Friend[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getHomeData(): Observable<HomeData> {
    return this.http.get<HomeData>(`${this.apiUrl}/home`);
  }
}