import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private _http: HttpClient
  ) {}

  getUserProfile(): Observable<Object> {
    return this._http.get(environment.apiBaseUrl + '/userprofile');
  }
}
