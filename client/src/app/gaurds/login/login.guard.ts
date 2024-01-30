import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config/config.service';
import { UserService } from 'src/app/services/user/user.service';
import { ApiResponseInterface } from '../../../../../interfaces/apiResponseInterface';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private configService: ConfigService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Checking in config service
    if (this.configService.isLoggedIn) {
      return true;
    } else {
      return new Promise((resolve, reject) => {
        this.configService.refreshToken().subscribe(
          (response: HttpResponse<ApiResponseInterface>) => {
            if (response.body.success) {
              this.configService.isLoggedIn = true;
              this.configService.startTokenTimer();
              resolve(true);
            }
          },
        )
      })
    }

  }
}
