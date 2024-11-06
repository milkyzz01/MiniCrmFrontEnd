import { Component } from '@angular/core';
import { ServicesService } from '../services.service'; // Adjust the path as needed
import { PostData, ApiResponse } from '../data.model'; // Adjust the path as needed
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../loader/loader.component";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  //variables
  username: string = ''; 
  password: string = '';
  
    //constructor
     constructor(private servicesService: ServicesService, private router: Router){}

  //method to reset or clear form after submit
  resetForm(){
    this.username = ''; 
    this.password ='';
  }

  // Method to handle login
  login() {
    const loginData: PostData = {
      username: this.username,
      password: this.password
    };
    // turn on the loader
    this.servicesService.setLoading(true);
    
    //delay the method or function so that loader will be visible
    setTimeout(() => {
    this.servicesService.postData(loginData.username, loginData.password).subscribe({
      next: (response: ApiResponse) => {
        //check if the rsponse is success or invalid
        if (response.message === 'Login successful'){
        console.log('Login message:', response.message);
        console.log('User data:', response);
        this.resetForm();
        this.servicesService.setLoading(false);
        Swal.fire({
          title: 'Success!',
          text: 'You have logged in successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Navigate to the content page after the alert is closed
          this.router.navigate(['content']);
        });

      } else {
        this.resetForm();
        this.servicesService.setLoading(false);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to LogIn Something Wrong.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      },
      error: (error) => {
        console.error('Error during login:', error);
        this.resetForm();
        this.servicesService.setLoading(false);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to LogIn.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }, 2000);
  }
}
