import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';
import { ApiResponseInterface } from '../../../../../interfaces/apiResponseInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
  }

  // logout
  logout() {
    this.configService.logout();
  }

  test(): void { 

    this.configService.testTokenPassing().subscribe(
      (response: HttpResponse<ApiResponseInterface>) => {
        if (response.body.success) {
         console.log(response)
        }
      },
    );
  }
}
