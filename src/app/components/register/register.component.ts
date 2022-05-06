import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public hide: boolean = true;

  public passwordRegexp: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  constructor() {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.passwordRegexp),
      ]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('registerForm: ', this.registerForm);
    console.log('registerForm: ', this.registerForm.value);
    this.registerForm.reset();
  }

  getNameErrorMessage(inputField: string): string | undefined {
    if (this.registerForm.hasError('required', inputField)) {
      return 'You must enter a value';
    }
    if (this.registerForm.hasError('minlength', inputField)) {
      return 'The minimum length for this field is 2 characters';
    }
    if (this.registerForm.hasError('email', inputField)) {
      return 'Not a valid email';
    }
    if (this.registerForm.hasError('pattern', inputField)) {
      return 'The	password must contain minimum six	characters, at least one letter and one number';
    }

    return;
  }
}
