import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit {

  //variables
  employeeDetails: number = 0;
  employeeResponse: any;
  employeeCompany: String | null = null;

  
  constructor(private route: ActivatedRoute, private service: ServicesService){
    this.route.params.subscribe(params =>{
      console.log(params);
      this.employeeDetails = params['employeeID'];
      this.employeeCompany = params['employeeCompany'];
      console.log(this.employeeDetails)
      console.log(this.employeeCompany);
    })
  }
  
  //methods
  getemployeeDetails(){
    const employeeID = this.employeeDetails
    this.service.viewEmployee({employeeID}).subscribe({
      next: (response: any) =>{
        console.log(response);
        this.employeeResponse = response[0];
        console.log(response[0]);
      }
    })
  };
  goBack() {
    window.history.back(); // Go back to the previous page
  };

  //hooks
  ngOnInit(): void {
    this.getemployeeDetails();
  }
}
