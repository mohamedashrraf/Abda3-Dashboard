import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AppState } from '../../store/app.state';
import { createUser, updateUser, loadUserById } from '../store/users.actions';

@Component({
  selector: 'app-create-update-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-update-user.component.html',
  styleUrl: './create-update-user.component.scss'
})
export class CreateUpdateUserComponent {
 userForm: FormGroup;
  isEditMode: boolean;
  user$!: Observable<User>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isEditMode = !!this.route.snapshot.params['id'];
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      active: [true, Validators.required]
    });

    if (this.isEditMode) {
      const userId = this.route.snapshot.params['id'];
      this.store.dispatch(loadUserById({ userId }));
      // this.user$ = this.store.select(state => state.selectedUser);
      this.user$.subscribe(user => {
        if (user) {
          this.userForm.patchValue(user);
        }
      });
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      if (this.isEditMode) {
        const userId = this.route.snapshot.params['id'];
        this.store.dispatch(updateUser({ userId, user }));
      } else {
        this.store.dispatch(createUser({ user }));
      }
      this.router.navigate(['/users']);
    }
  }
}

