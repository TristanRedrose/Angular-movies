import { Injectable } from "@angular/core";
import { Users } from "src/app/models/users.types";
import { RegistrationService } from "./registration.service";
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "src/app/models/response.types";
import { map,Observable } from "rxjs";

@Injectable ({
    providedIn: 'root'
})

export class LoginService {

    private _token: string | null = null;
    private _key: string = 'Token';
    
    constructor(private registrationService: RegistrationService, private http: HttpClient) {

    }

    logIn(user: Users): Observable <void>  {
        return this.http.post<ApiResponse>("http://localhost:3000/api/login", user).pipe(map((res: ApiResponse) => {
            this._token = res.token;
            localStorage.setItem(this._key, this._token);
        }))
    }

    logOut(): void {
        this._token = null; 
        localStorage.setItem(this._key, this._token);
        console.log("logged out");
    }

    isLoggedIn(): boolean {
        this._token = localStorage.getItem(this._key);
        return this._token !== 'null';
    }

}