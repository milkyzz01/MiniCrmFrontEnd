import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { CommonModule } from '@angular/common';
import { Company } from '../data.model';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginator,
    LoaderComponent
    
  ],
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'] // Correct property name
})
export class CompanyComponent implements OnInit, AfterViewInit {

  // Variables
  displayedColumns: string[] = ['companyID', 'companyName', 'companyEmail', "Action"];
  companiesResponse = new MatTableDataSource<Company>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private services: ServicesService, private router: Router) {}

  // Methods
  getCompanies() {
    this.services.getCompanies().subscribe({
      next: (response: Company[]) => {
        this.companiesResponse.data = response;
        console.log(this.companiesResponse.data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  };

  navigatetoAddCompany(){
    this.router.navigateByUrl('/content/addCompany');
  }
  

  // Lifecycle Hooks
  ngOnInit() {
    console.log('Component initialized!');
    this.getCompanies();
  }

  ngAfterViewInit() {
    this.companiesResponse.paginator = this.paginator; // Set the paginator
  }

  //toggle options in action column
  selectedElement: any;

  toggleOptions(element: any) {
    if (this.selectedElement === element) {
      this.selectedElement = null; 
    } else {
      this.selectedElement = element;
    }
  }

  viewDetails(element: any) {
    // Implement your view details logic here
    console.log('View details for:', element);
    this.router.navigate(['/content/companydetails', element]);
  }

  deleteElement(element: any) {
    const companyID = element.companyID; // Adjust based on your actual data structure
    console.log('Delete element:', companyID);

    this.services.setLoading(true);
    
    setTimeout(() => {
    this.services.deleteCompany({ companyID }).subscribe({
        next: (response: any) => {
            console.log(response);
            if(response.message === 'Company deleted successfully'){
              this.toggleOptions(element);
              this.getCompanies();
              this.services.setLoading(false);
              Swal.fire({
                title: 'Success!',
                text: 'You have inserted successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
              });
            }
        },
        error: (err) => {
            console.error('Error deleting company:', err);
            this.services.setLoading(false);
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
