import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [ CommonModule, MatIconModule ],
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss'
})
export class CompanyDetailsComponent implements OnInit {

  //variables
  companyIDParams: number = 0;
  companyDetails: any;
  employeeCompany: any;
  filteredEmployee: any;

  constructor(private route: ActivatedRoute, private service: ServicesService){
    this.route.params.subscribe(params => {
      console.log('PARAMS' + params['companyID']); 
      this.companyIDParams = params['companyID'];
      console.log('hahah' + this.companyIDParams)
    });
  }
  //methods
  getCompanyDetails(){
    const companyID = this.companyIDParams;
    this.service.viewCompany({companyID}).subscribe({
      next: (response: any) =>{
        console.log(response);
        this.companyDetails = response[0];
      }
    })
  };
  goBack() {
    window.history.back(); // Go back to the previous page
  };
  getEmployeeintheCompany(){
    this.service.getEmployees().subscribe({
      next: (response: any) =>{
        this.employeeCompany = response;
        console.log(this.employeeCompany);
        this.filteredEmployee = this.employeeCompany.filter((employee: any) => employee.employeeCompany == this.companyIDParams);
        console.log(this.filteredEmployee); // Check filtered results
      }
    })
  }
  ngOnInit(): void {
    console.log('companyid' + this.companyIDParams);
    this.getCompanyDetails();
    this.getEmployeeintheCompany()
  }
}
