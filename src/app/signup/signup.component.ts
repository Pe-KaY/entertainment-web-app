import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { DataService } from '../services/dataServices/data.service';
import { AuthorizationService } from '../services/authorization-service/authorization.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  SignupForm!: FormGroup;
  loading = false;
  errorMessage = false;

  
  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    private authorizationService: AuthorizationService,
    private router: Router  
  ) {
    this.SignupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatpassword: ['', Validators.required],
    });
  }

  signup() {
    if (
      this.SignupForm.value.password !== this.SignupForm.value.repeatpassword
    ) {
      this.errorMessage = true;
      setTimeout(() => {
        this.errorMessage = false;
      }, 5000);
      return;
    }

    this.loading = true;
    this.authorizationService
      .signup(this.SignupForm.value.username, this.SignupForm.value.password)
      .subscribe({
        next: () => {
          this.dataService.userlogin = true;
          setTimeout(() => {
            this.loading = false;
            this.router.navigate(['/login']);
            // this.dataService.modal = false;
          }, 5000);
        },
        error: (err) => {
          setTimeout(() => {
            this.loading = false;
            this.errorMessage = true;
          }, 5000);
        },
      });
  }
}
