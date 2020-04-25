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
        // 1.Check ar yra cookies, 2.jei nėra, vesti į login screena.
        var sausainiukas = this.cookies.get("loginas")
        if (sausainiukas != "")
            return true;
        else {
            this.router.navigate(['/prisijungimas']);
        }


        // const currentUser = this.authenticationService.currentUserValue;
        // if (currentUser) {
        //     // authorised so return true
        //     return true;
        // }

        // // not logged in so redirect to login page with the return url
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}