import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../data.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginator, MatButtonModule, MatIconModule, LoaderComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit, AfterViewInit{

  //variables
  displayedColumns: any = ['employeeID', 'employeeName', 'employeeCompany', "dateCreated", "Action"];
  employeesData = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ServicesService, private router: Router){}


  //methods
  getEmployeeData(){
    this.service.getEmployees().subscribe({
      next: (response: Employee[]) =>{
        this.employeesData.data = response;
        console.log(this.employeesData);
      },
      error: (error) =>{
        console.log(error);
      }
    })
  };
  navigateToAddEmployee() {
    this.router.navigate(['content/addemployee'])
  }

  //hooks
  // Lifecycle Hooks
  ngOnInit() {
    console.log('Component initialized!');
    this.getEmployeeData();
  }
  ngAfterViewInit() {
    this.employeesData.paginator = this.paginator; // Set the paginator
  }

  //method for popup options
  //toggle options in action column
  selectedElement: any;

  toggleOptions(element: any) {
    if (this.selectedElement === element) {
      this.selectedElement = null; 
    } else {
      this.selectedElement = element;
    }
  }

  viewDetails(data: any) {
    // Implement your view details logic here
    console.log('View details for:', data);
    this.router.navigate(['/content/employeedetails', data.employeeID, data.employeeCompany]);
  }
  deleteElement(element: any) {
    const employeeID = element.employeeID; // Adjust based on your actual data structure
    console.log('Delete element:', employeeID);

    this.service.setLoading(true);
    
    setTimeout(() => {
    this.service.deleteEmployee({ employeeID }).subscribe({
        next: (response: any) => {
            console.log(response);
            if(response.message === 'employee deleted successfully'){
              this.toggleOptions(element);
              this.getEmployeeData();
              this.service.setLoading(false);
              Swal.fire({
                title: 'Success!',
                text: 'You have inserted successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
              });
            }
        },
        error: (err) => {
            console.log('Error deleting company:', err);
            this.service.setLoading(false);
            Swal.fire({
              title: 'Error!',
              text: 'Deleting Company Failed.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
        }
    });
    }, 2000);
}
}


