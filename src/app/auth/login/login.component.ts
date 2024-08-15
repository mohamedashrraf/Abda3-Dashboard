import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../store/auth.actions';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
   this.loginForm = this.fb.group({
      field: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]], 
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { field, password } = this.loginForm.value;
      this.store.dispatch(login({ field, password }));

      this.router.navigate(['/users']);
    }
  }


}
