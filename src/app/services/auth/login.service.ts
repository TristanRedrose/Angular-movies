import { Injectable } from "@angular/core";
import { Users } from "src/app/models/users.types";
import { RegistrationService } from "./registration.service";

@Injectable ({
    providedIn: 'root'
})

export class LoginService {

    private _currentSession: string | null = null;
    private _key: string = 'currentSession'
    
    constructor(private registrationService: RegistrationService) {

    }

    logIn(user: Users): boolean {
        if (this.registrationService.userExists(user) === true) {
            this._currentSession = user.username;
            localStorage.setItem(this._key, this._currentSession);
            console.log(`${ user.username } logged in`);
            return true;
        }
        else {
            return false;
        }
    }

    logOut(): void {
        this._currentSession = null; 
        localStorage.setItem(this._key, this._currentSession);
        console.log("logged out");
    }

    isLoggedIn(): boolean {
        this._currentSession = localStorage.getItem(this._key);
        return this._currentSession !== 'null';
    }

}