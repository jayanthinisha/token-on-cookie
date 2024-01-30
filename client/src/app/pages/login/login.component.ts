import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config/config.service';
import { UserService } from 'src/app/services/user/user.service';
import { ApiResponseInterface } from '../../../../../interfaces/apiResponseInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName= this.configService.accessJson.username
  password= this.configService.accessJson.password
  title = this.configService.configJson.title

  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // Validate user and assign token to cookie
  login(): void {

    console.log('login')
    this.userService.login('username', 'password').subscribe(
      (response: HttpResponse<ApiResponseInterface>) => {
        if (response.body.success) {
          const payload: string = response.body.payload;
          this.configService.isLoggedIn = true
          this.configService.startTokenTimer();
          this.router.navigate(['/home']);
        }
      },
    );
  }

}
