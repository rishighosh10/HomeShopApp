import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SignupListService } from './signup-list.service';
// import { Subject } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  addSignupForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl<number>(-1),
    address: new FormControl(''),
    pinCode: new FormControl<number>(-1),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    isActive: new FormControl<boolean>(true),
    role: new FormControl(''),
  });

  submitted = false;
  PasswordError = false;
  ShowPasswordError = false;
  // ShowPasswordError: Subject<boolean> = new Subject();
  // this.ShowPasswordError.next(false);

  constructor(
    private formBuilder: FormBuilder,
    private signupListService: SignupListService
  ) {}

  ngOnInit(): void {
    // this.ShowPasswordError.next(false);
    this.addSignupForm = this.formBuilder.group({
      name: [, Validators.required],
      email: [, [Validators.required, Validators.email]],
      contact: [, [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      address: [, Validators.required],
      pinCode: [
        ,
        [Validators.required, Validators.pattern(/^[1-9]{1}\d{2}\s?\d{3}$/)],
      ],
      password: [
        ,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
          ),
        ],
      ],
      confirmPassword: [
        ,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
          ),
        ],
      ],
      isActive: [true, { initialValueIsDefault: true }],
      role: ['Customer', { initialValueIsDefault: true }]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.addSignupForm.controls;
  }
  addSignupSubmit() {
    this.submitted = true;
    if (this.addSignupForm.invalid) {
      return;
    }
    // console.log(this.addSignupForm.value);
    // console.log(this.addSignupForm.value['Password'] != this.addSignupForm.value['ConfirmPassword']);
    if (
      this.addSignupForm.get('password')?.value !==
      this.addSignupForm.get('confirmPassword')?.value
    ) {
      this.ShowPasswordError = true;
      // this.ShowPasswordError.next(true);
      console.log("Passwords do not match!");
      return;
    }

    console.log('Signup Submit');
    console.log(JSON.stringify(this.addSignupForm.value, null, 2));

    this.signupListService
      .addCustService(this.addSignupForm.value)
      .subscribe((data) => {
        console.log(data);
      });

    this.addSignupForm.reset();
    alert('Signup Successfully');
    this.submitted = false;
  }
}
