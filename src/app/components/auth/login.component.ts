import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Users } from "src/app/models/users.types";
import { LoginService } from "src/app/services/auth/login.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ['./authForms.component.css'],
}) 

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorMessage: null | string = null

    constructor(private router: Router,private loginService: LoginService) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),     
        })
    }

    goToRegister(): void {
        this.router.navigate(["/register"]);
    }

    onSubmit() {
        this.loginForm.markAllAsTouched();
        if (this.loginForm.get("username").errors === null && this.loginForm.get("password").errors === null) {
            let user: Users = {
                username: this.loginForm.get("username").value,
                password: this.loginForm.get("password").value,
            }
            this.loginService.logIn(user).subscribe(() => {
                this.router.navigate(['/']);
            },
            (err: HttpErrorResponse) => {
                this.errorMessage = err.error.message;
                let subscription = this.loginForm.valueChanges.subscribe(() => {
                    this.errorMessage = null;
                    subscription.unsubscribe;
                })
            });
        }
    }
}
