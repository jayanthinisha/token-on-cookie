import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiRoute = `${this.configService.api}/user`;

  constructor(
    private configService: ConfigService
  ) { }

  // Add token in cookie
  login(username: string, password: string) {
    return this.configService.contactApi('post', `${this.apiRoute}/login`, { username, password });
  }
}
