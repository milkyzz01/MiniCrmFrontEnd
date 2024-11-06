import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../services.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatSelectModule, MatInputModule, FormsModule, LoaderComponent],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit {

  //variables
  companies: any;

  //variables for form model
  employeeName: string = '';
  employeeEmail: string = '';
  employeeAddress: string = '';
  employeePhone: string = '';
  employeeAge: number = 0;
  employeeBirthdate: string = '';
  employeePosition: string = '';
  employeeCompany: number = 0;
  employeeProfile: File | null = null;


  //constructor
  
  constructor(private service: ServicesService, private router: Router){}

  //handle file 
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.employeeProfile = input.files[0]; // Get the selected file
    }
  }

  //methiods
  getCompanies(){
    this.service.getCompanies().subscribe({
      next: (response: any) =>{
        this.companies = response;
        console.log(response)
      }
    })
  };
  goBack() {
    window.history.back(); // Go back to the previous page
  };
  //method for appending form values
  onSubmit() {
    const formData = new FormData();
    
      formData.append('employeeName',this.employeeName);
      formData.append('employeeEmail',this.employeeEmail);
      formData.append('employeeCompany',String(this.employeeCompany));
      formData.append('employeeAddress',this.employeeAddress);
      formData.append('employeeAge',String(this.employeeAge));
      formData.append('employeeBirthdate',this.employeeBirthdate);
      formData.append('employeePhone',this.employeePhone);
      formData.append('employeePosition',this.employeePosition); 
      if (this.employeeProfile) {
        formData.append('employeeProfile', this.employeeProfile); 
      } else {
        console.warn('No company logo selected.');
      }
  
    this.service.setLoading(true);
    setTimeout(() => {
     this.sendEmployeeData(formData);
     
    }, 2000);
  }
    
  sendEmployeeData(employeeData: FormData){
    
    this.service.addEmployees(employeeData).subscribe({
      next: (response: any) =>{
        if(response.message === 'Success' && response.result.affectedRows > 0){
          console.log('Success Inserting');
          this.service.setLoading(false);
          Swal.fire({
            title: 'Success!',
            text: 'You have inserted successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() =>{
            this.router.navigate(['content/employee'])
          });
        }
      },
      error: (err) => {
        console.error('Error adding employee', err);
        this.service.setLoading(false);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add employee.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
      
    });
  
  }



  //hooks
  ngOnInit(){
    this.getCompanies();
  }


}
