import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-content-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.scss'
})
export class ContentLayoutComponent implements OnInit {

  //variables
  activeItem: string = '';

  constructor(private router: Router, private service: ServicesService){}
  

  //methods
  navigateToDashboard() {
    this.router.navigate(['content/dashboard']);
  }
  navigateToCompany() {
    this.router.navigate(['content/company'])
  }
  navigateToEmployee() {
    this.router.navigate(['content/employee'])
  }
 
  //methods to manage the state of the sidemenu
  setActive(item: string) {
    this.activeItem = item;
  }

  isActive(item: string): boolean {
    return this.activeItem === item;
  }

  logout() {
    this.service.destroycookie().subscribe({
      next: () => {
        localStorage.removeItem('token');  // Remove any token from localStorage
        window.location.reload();  // Reload the page to reset the session and redirect to login
        this.checkauth();
      },
      error: (err) => {
        console.error('Logout failed:', err);
      }
    });
  }

  checkauth(){
    this.service.checktoken().subscribe({
      next: (response) => {
        // If the backend confirms the user is authenticated, you stay on the content page
        console.log('User authenticated:', response);
      },
      error: (error) => {
        // If authentication fails (e.g., token not valid), redirect to login
        console.log('User not authenticated:', error);
        this.router.navigate(['/']);
      }
    })
  }

  
  ngOnInit(){
    this.checkauth();
  }
}
