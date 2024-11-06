import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContentLayoutComponent } from './content-layout/content-layout.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyComponent } from './company/company.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';


export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'content',
        component: ContentLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard', // Redirect to 'dashboard' when accessing 'content'
                pathMatch: 'full' // Ensures the whole path is matched
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'company',
                component: CompanyComponent
            },
            {
                path: 'employee',
                component: EmployeeComponent
            },
            {
                path: 'addemployee',
                component: AddEmployeeComponent
            },
            {
                path: 'addCompany',
                component: AddCompanyComponent
            },
            {
                path: 'companydetails/:companyID',
                component: CompanyDetailsComponent
            },
            {
                path: 'employeedetails/:employeeID/:employeeCompany',
                component: EmployeeDetailsComponent
            }
        ]
    }
];
