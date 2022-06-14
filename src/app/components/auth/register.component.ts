import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, RequiredValidator, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Users } from "src/app/models/users.types";
import { RegistrationService } from "src/app/services/auth/registration.service";

@Component ({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"],
})

export class RegisterComponent implements OnInit {

    registrationForm: FormGroup;
    passwordMatch: boolean = true;
    nullPassword: boolean = false;
    registrationSuccess: boolean = true;
    user: Users;

    constructor(private router:Router, private registrationService: RegistrationService) {

    }

    ngOnInit(): void {
        this.registrationForm = new FormGroup({
            passwordsInput: new FormGroup ({
                password: new FormControl(null, Validators.required),
                confirm: new FormControl(null, Validators.required),
            }),
            username: new FormControl(null, Validators.required),
        });
    }

    goToLogin(): void {
        this.router.navigate(["/login"]);
    }

    onSubmit(): void {
        console.log(this.registrationForm)
        this.registrationForm.markAllAsTouched();
        if (this.registrationForm.value.passwordsInput.password === null) {
            this.nullPassword = true;
            let subscription = this.registrationForm.get("passwordsInput.password").valueChanges.subscribe(res => {
                this.nullPassword = false;
                subscription.unsubscribe();
            })
        }
        else if (this.registrationForm.value.passwordsInput.password !==
            this.registrationForm.value.passwordsInput.confirm) {
                this.passwordMatch = false;
                this.registrationForm.get("passwordsInput.password").setErrors({passwordsDontMatch: true});
                this.registrationForm.get("passwordsInput.confirm").setErrors({passwordsDontMatch: true});
                let subscription = this.registrationForm.get("passwordsInput").valueChanges.subscribe(res => {
                    this.passwordMatch = true;
                    this.registrationForm.get("passwordsInput.password").setErrors(null);
                this.registrationForm.get("passwordsInput.confirm").setErrors(null);
                    subscription.unsubscribe();
                })
        }
        else {
            this.passwordMatch = true;
            this.user = {
                username: this.registrationForm.value.username,
                password: this.registrationForm.value.passwordsInput.password,
            }
            this.registrationSuccess = this.registrationService.registerUser(this.user);

            if (this.registrationSuccess === false) {
                this.registrationForm.get("username").setErrors({usernameNotUnique: true});
                let subscription = this.registrationForm.get("username").valueChanges.subscribe(res => {
                    this.registrationSuccess = true;
                    subscription.unsubscribe();
                })
            }
        }
    }
}