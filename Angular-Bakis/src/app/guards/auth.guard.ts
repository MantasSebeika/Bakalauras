import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // 1.Check ar yra cookies, 2.jei nėra, vesti į login screena.
        this.router.navigate(['/prisijungimas']);
        
        
        
        
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