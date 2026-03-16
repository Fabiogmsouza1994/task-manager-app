import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenAuthEnum } from '../enums/token-auth.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _http: HttpClient) {}
  baseUrl: string = 'https://localhost:7065/api';

  createUser(formData: any) {
    return this._http.post(this.baseUrl + '/signup', formData);
  }

   signIn(formData: any) {
    return this._http.post(this.baseUrl + '/signin', formData);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(TokenAuthEnum.token) !== null ? true : false;
  }

  saveToken(token: string): void {
    localStorage.setItem(TokenAuthEnum.token, token);
  }

  deleteToken(): void {
        localStorage.removeItem(TokenAuthEnum.token);

  }
}
