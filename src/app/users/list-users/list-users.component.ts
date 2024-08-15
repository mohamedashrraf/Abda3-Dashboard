import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
  ],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery: string = '';
  sortColumn: string = 'name';
  sortDirection: string = 'asc';
user!: User;

  constructor(private usersService: UsersService, private router:Router) {}

ngOnInit(): void {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token && token.startsWith('Bearer ')) {
      this.getUsers();
    } else {
      console.error('User is not authenticated');
    }
  }
}


getUsers(): void {
  this.usersService.getUsers().subscribe(
    (users: User[]) => {
      this.users = users;
      this.filteredUsers = users;
      console.log('Users:', this.users);
      console.log('Filtered Users:', this.filteredUsers);
    },
    error => {
      console.error('Error fetching users:', error);
    }
  );
}

  searchUsers(): void {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  sortUsers(column: keyof User): void {
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }

  this.filteredUsers.sort((a, b) => {
    const valueA = a[column];
    const valueB = b[column];
    let comparison = 0;
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      comparison = valueA.localeCompare(valueB);
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      comparison = valueA - valueB;
    }
    return this.sortDirection === 'asc' ? comparison : -comparison;
  });
}

viewProfile(user: User): void {
    this.router.navigate(['/users', user.id]);
  }


  editUser(user: User): void {
    console.log('Editing user:', user);
    this.usersService.updateUser(user.id, user).subscribe(
      updatedUser => {
        console.log('User updated:', updatedUser);
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
  }

  // deleteUser(user: User): void {
  //   console.log('Deleting user:', user);
  //   if (confirm(`Are you sure you want to delete ${user.name}?`)) {
  //     this.usersService.deleteUser(user.id).subscribe(
  //       () => {
  //         console.log('User deleted successfully');
  //       },
  //       error => {
  //         console.error('Error deleting user:', error);
  //       }
  //     );
  //   }
  // }

  deleteUser(user: User): void {
  console.log('Deleting user:', user);
  if (confirm(`Are you sure you want to delete ${user.name}?`)) {
    this.users = this.users.filter(u => u.id !== user.id);
    this.filteredUsers = this.filteredUsers.filter(u => u.id !== user.id);

    console.log('User removed from the list successfully');
  }
}


  toggleActivation(user: User): void {
    this.usersService.toggleUserStatus(user.id).subscribe((updatedUser: User) => {
      user.active = updatedUser.active;
    });
  }
}
