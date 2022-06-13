import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
        if (this.registrationForm.value.passwordsInput.password !== 
            this.registrationForm.value.passwordsInput.confirm) {
            this.passwordMatch = false;
        }
        else {
            this.passwordMatch = true;
            this.user = {
                username: this.registrationForm.value.username,
                password: this.registrationForm.value.passwordsInput.password,
            }
            this.registrationSuccess = this.registrationService.registerUser(this.user);
        }
    }
}