import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../modules/login/login.service";

@Injectable({
    providedIn:'root'
})
export class CoacheeGuard implements CanActivate{
    
    constructor(private loginService: LoginService,private router:Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // throw new Error("Method not implemented.");
        const url:string= state.url;

       return this.checkLogin(url);
    }

    
    checkLogin(url: string): boolean {
        if (sessionStorage.getItem('isloggedIn') && JSON.parse(sessionStorage.getItem('connectedUser')).role === 'Coachee'){
            return true;
        }
        //stored the attempted URL for redirecting
        this.loginService.redirectUrl=url;

        // navigate to login page
        this.router.navigate(['']);
        return false;
    }
}