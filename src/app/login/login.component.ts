import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
/**
 * Modify the login component and the login template to collect login details and add the validators as necessary
 */
import { AuthenticationService } from '../services/authentication.service';

@Component({
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // setup the loginform and validators
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email, this.usernameValidator()]],
      password: ['', [Validators.required, this.passwordValidator()]],
    });
  }

  ngOnDestroy() {}

  onSubmit() {
    //
    console.log('Form Submitted');
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password);
    }
  }

  // implement the username validator. Min 6 characters and no digits, special chars
  usernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const validLength = value.length >= 6;
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecialChar = /[!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
      const userNameValid = validLength && !hasNumeric && hasSpecialChar;

      return !userNameValid ? { userNameInvalid: true } : null;
    };
  }

  // implement the password validator
  // Min 1 uppercase, 1 lower case and a digit. Total length >= 8
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const validLength = value.length >= 8;
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const passwordValid =
        validLength && hasUpperCase && hasLowerCase && hasNumeric;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }
}
