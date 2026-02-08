import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _http: HttpClient) {}
  baseUrl: string = 'https://localhost:7065/api';

  createUser(formData: any) {
    return this._http.post(this.baseUrl + '/signup', formData);
  }
}
