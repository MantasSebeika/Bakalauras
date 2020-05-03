import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private cookies: CookieService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var sausainiukas = this.cookies.get("loginasAdmin")
        if (sausainiukas != "")
            return true;
        else {
            this.router.navigate(['/prisijungimas']);
        }


    
        return false;
    }
}