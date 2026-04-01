import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenAuthEnum } from '../enums/token-auth.enum';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _http: HttpClient) {}

  createUser(formData: any) {
    return this._http.post(environment.apiBaseUrl + '/signup', formData);
  }

  signIn(formData: any) {
    return this._http.post(environment.apiBaseUrl + '/signin', formData);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null ? true : false;
  }

  saveToken(token: string): void {
    localStorage.setItem(TokenAuthEnum.token, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TokenAuthEnum.token)
  }

  deleteToken(): void {
    localStorage.removeItem(TokenAuthEnum.token);
  }
}
