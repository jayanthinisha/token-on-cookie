import { Injectable } from '@angular/core';
import configJson from '../../../../../json/config.json';
import accessJson from '../../../../../json/access.json';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { ApiResponseInterface } from '../../../../../interfaces/apiResponseInterface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  api: string = environment.api;
  configJson = configJson;
  accessJson = accessJson;
  isLoggedIn: boolean

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  // Storing in Session Storage
  storeInSessionStorage = (key: string, value: string): void => sessionStorage.setItem(key, value);

  // Getting from Session Storage
  getFromSessionStorage = (key: string) => {
    const value = sessionStorage.getItem(key) ? sessionStorage.getItem(key) : undefined;
    return value;
  }

  // Storing in Local Storage
  storeInLocalStorage = (key: string, value: string): void => localStorage.setItem(key, value);

  // Getting from Local Storage
  getFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key) ? localStorage.getItem(key) : undefined;
    return value;
  }

  // Clearing Session Storage
  clearSessionStorage = (): void => sessionStorage.clear();

  // Clearing Local Storage
  clearLocalStorage = (): void => localStorage.clear();

  // Refresh token
  refreshToken() {
    return this.contactApi('get', `${this.api}/user/refreshToken`);
  }

  // Token timer
  startTokenTimer() {
    // Refresh to token for every 4 mins
    setInterval(() => {
      this.refreshToken().subscribe(
        (response: HttpResponse<ApiResponseInterface>) => {
          if (response.body.success) {
            this.isLoggedIn = true
          }
        },
      )
    }, 240000)
  }

  // logout User
  logout = (): void => {
    this.clearSessionStorage();
    this.clearLocalStorage();
    // Clear auth cookie
    this.contactApi('get', `${this.api}/user/logout`).subscribe(
      (response: HttpResponse<ApiResponseInterface>) => {
        if (response.body.success) {
          this.router.navigate(['/login']);
        }
      },
    )
  }

  testTokenPassing() {
    return this.contactApi('get', `${this.api}/user/testTokenPassing`);
  }

  // Contacting Api
  contactApi = (method: string, endPoint: string, data?: any): Observable<HttpResponse<ApiResponseInterface>> => {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true, 
      observe: 'response' as 'response'
    };

    switch (method) {
      case 'get': return this.http.get<ApiResponseInterface>(endPoint, httpOptions);
      case 'post': return this.http.post<ApiResponseInterface>(endPoint, data, httpOptions);
      default : throw new Error('Contact Api Error');
    }
  }

}

