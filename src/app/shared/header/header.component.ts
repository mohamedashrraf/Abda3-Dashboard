import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
  }

  logout() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.router.navigate(['/auth']);
    }
  }
}
