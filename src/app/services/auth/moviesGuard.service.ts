import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import { LoginService } from "./login.service";

@Injectable({
    providedIn: 'root'
})

export class MoviesRouteService implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) {

    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {

        return this.loginService.isLoggedIn()
            ? true
            : this.router.createUrlTree(['/login']);
    }
}