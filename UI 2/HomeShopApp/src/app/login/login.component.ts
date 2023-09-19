import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from './login.service';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  isAdmin = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.localStorageService.logout();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
          ),
        ],
      ],
      isAdmin: [false],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  // hideShowPass(){
  //   this.isText = !this.isText;
  //   this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash"
  // }

  LoginSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    console.log('Login Submit');
    console.log(JSON.stringify(this.loginForm.value, null, 2));

    this.loginService.loginService(this.loginForm.value).subscribe((data) => {
      console.log(data);
      this.localStorageService.set('token', data.token);
      this.localStorageService.set('customerId', data.customerId);
      this.localStorageService.set('email', data.email);
      this.localStorageService.set('name', data.name);
      this.localStorageService.set('contact', data.contact);
      this.localStorageService.set('role', data.role);
      console.log(this.localStorageService.get('token'));
      console.log(this.localStorageService.get('customerId'));
      console.log(this.localStorageService.get('email'));
      console.log(this.localStorageService.get('name'));
      console.log(this.localStorageService.get('contact'));
      console.log(this.localStorageService.get('role'));

      this.loginForm.reset();
      this.submitted = false;


      if (this.localStorageService.get('role') == 'Customer') {
        this.router.navigateByUrl('');

      } else {
        this.router.navigateByUrl('/login');

      }
    });

  }
}
