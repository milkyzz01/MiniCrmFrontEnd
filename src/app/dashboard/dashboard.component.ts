import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ServicesService } from '../services.service';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

//qregister to used
Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatSelectModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Variables
  companylength: number = 0;
  employeeLength: number = 0;
  chart: any;
  pieChart: any;
  companies: any;
  companies2: any;
  counts: number[] = []; 
  currentPage: number = 1;
  itemsPerPage: number = 4;
  employeeData: any[] = []; // Store all employee data
  employeeDetails: any[] = []; // Store employee details
  selectedCompany: any;
  //var to store the initial value of pie chart
  pieInitialValue: number = 0;

  //var for chart deliverables
  under25: number = 0;
  over25: number = 0;

  // pie chart config
  public Pieconfig: any = {
    type: 'doughnut',
    data: {
      labels: ['Under 25', '25 and Over'],
      datasets: [{
        data: [0,0],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'right', // Move the legend to the right side
          align: 'start' // Align items at the start of the legend
        },
      }
    }
  }

  // bAR Chart config
  public config: any = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{ label: 'Employees', data: [], backgroundColor: '#a8e6cf', borderColor: [
      'rgba(75, 192, 192, 0.2)'], borderWidth: 1
           }]
    },
    options: {
      aspectRatio: 1,
      
    
      
    }
  };

  constructor(private service: ServicesService) {}
  //hooks
  ngOnInit() {
    this.getCompanyLength();
    this.getEmployeeLength();
    this.piechartinit();
    
  }

  //API METHODS
  getCompanyLength() {
    //
    this.service.getCompanies().subscribe({
      next: (response: any) => {
        this.companylength = response.length;
        this.companies2 = response; // Store the list of companies
        this.pieInitialValue = response[0].companyID;
        this.updateAgeDistribution(this.pieInitialValue);
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }
  getEmployeeLength() {
    this.service.getEmployees().subscribe({
      next: (response: any) => {
        this.employeeLength = response.length;
        this.employeeData = response; // Store the employee data for future use
  
        this.updateChartData(response);
      }
    });
  }

  //METHODS FOR BAR CHART
  updateChartData(employeeData: any[]) {
    const companyCounts: { [key: string]: number } = {};

    // Count employees per company
    employeeData.forEach((employee) => {
      const companyName: any = employee.companyName;
      companyCounts[companyName] = (companyCounts[companyName] || 0) + 1;
    });

    // Get all company names and counts
    this.companies = Object.keys(companyCounts);
    this.counts = Object.values(companyCounts); 

    // Paginate data
    this.updateChartForCurrentPage();
  }

  updateChartForCurrentPage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
  
    // Slice the data for the current page
    this.config.data.labels = this.companies.slice(start, end);
    this.config.data.datasets[0].data = this.counts.slice(start, end);
  
    // Calculate the max value for y-axis
    const maxCount = Math.max(...this.counts);
    this.config.options.scales = {
      y: {
        beginAtZero: true,
        max: maxCount + 3 // Set max to 5 more than the highest count
      }
    };
    if (this.chart) {
      this.chart.update();
    } else {
      this.chart = new Chart('MyChart', this.config);
    }
  }
  // Pagination methods
  nextPage() {
    const totalPages = Math.ceil(this.companies.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateChartForCurrentPage(); 
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateChartForCurrentPage(); 
    }
  }

  //methods for pie chart
  //init pie chart
  piechartinit(){
    this.pieChart = new Chart('PieChart', this.Pieconfig);
  }
   // Handle company selection change
   onCompanyChange(event: any) {
    const selectedCompany = event.target.value;
    
    this.updateAgeDistribution(selectedCompany);
  }

  updateAgeDistribution(companyName: number) {
    // Fetch employee details for the selected company
    this.service.getEmployeeDetails().subscribe(details => {
      this.employeeDetails = details;
  
      
  
      const ages = this.employeeDetails
        .filter(detail => {
          // Find the corresponding employee
          const employee = this.employeeData.find(emp => emp.employeeID === detail.employeeID);
          
       
          
          // Ensure both employee exists and belongs to the selected company
          return employee && employee.employeeCompany == companyName;
        })
        .map(detail => {
          
          return detail.employeeAge;
        });
  
   
  
      // Count ages
      this.under25 = ages.filter(age => age < 25).length;
      this.over25 = ages.filter(age => age >= 25).length;
  
    
  
      // Update the pie chart data
      this.Pieconfig.data.datasets[0].data = [this.under25, this.over25];
      this.pieChart.update();
    });
  }
}
