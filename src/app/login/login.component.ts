import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService } from '../services/dataServices/data.service';
import { AuthorizationService } from '../services/authorization-service/authorization.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = false;
  localstorage = typeof window !== 'undefined';

  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    private authorizationService: AuthorizationService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.loading = true;

    this.authorizationService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: () => {
          if (this.localstorage) {
            localStorage.setItem('username', this.loginForm.value.username);
          }
          this.dataService.userlogin = true;
          setTimeout(() => {
            this.loading = false;
            this.dataService.modal = false;
          }, 5000);
        },
        error: (err) => {
          console.log(err.error.message);
          setTimeout(() => {
            this.loading = false;
            this.errorMessage = true;
          }, 5000);
        },
      });
  }
}
