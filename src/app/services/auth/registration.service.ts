import { Injectable } from "@angular/core";
import { Users } from "src/app/models/users.types";

@Injectable({
    providedIn: 'root'
})

export class RegistrationService {
    private _key: 'registeredUsers';
    private _registeredUsers: Users[];

    constructor() {
        this.initUserList();
    }

    initUserList(): void {
        if (JSON.parse(localStorage.getItem(this._key)) != null){
          this._registeredUsers = JSON.parse(localStorage.getItem(this._key));
        }
        else {
          this._registeredUsers = [];
        }
        console.log(this._registeredUsers);
      }

    registerUser(user: Users): boolean {
        if (this.userExists(user) === false) {
            this._registeredUsers.push(user);
            localStorage.setItem(this._key, JSON.stringify(this._registeredUsers));
            console.log("User registered");
            return true
        }
        
        return false;
    }

    userExists(user: Users): boolean {
        return this._registeredUsers.find(item => item.username.toUpperCase() === user.username.toUpperCase()) !== undefined;
    }
}