import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiResponse, PostData, Company, Employee } from './data.model';



@Injectable({
  providedIn: 'root'
})
export class ServicesService{

  //variables
  private apiUrl: string = 'https://nodeexpressminicrm.onrender.com/login';
  private apiUrlGetCompanies: string = 'https://nodeexpressminicrm.onrender.com/companies';
  private apiUrlGetEmployees: string = 'https://nodeexpressminicrm.onrender.com/employees';
  private apiUrlEmployeeDetails: string = 'https://nodeexpressminicrm.onrender.com/employeeDetails';
  private apiUrlAddEmployee: string = 'https://nodeexpressminicrm.onrender.com/addEmployee';
  private apiUrlViewCompany: string = 'https://nodeexpressminicrm.onrender.com/companyDetails';
  private apiUrlAddCompany: string = 'https://nodeexpressminicrm.onrender.com/addcompany';
  private apiUrlDeleteCompany: string = 'https://nodeexpressminicrm.onrender.com/deleteCompany';
  private apiUrlDeleteEmployee: string = 'https://nodeexpressminicrm.onrender.com/deleteEmployee';
  private apiUrlViewEmployee: string = 'https://nodeexpressminicrm.onrender.com/detailsEmployee';
  private apiUrlcheckauth: string = 'https://nodeexpressminicrm.onrender.com/check-auth';
  private apiUrllogout: string = 'https://nodeexpressminicrm.onrender.com/logout';
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  //constructor
  constructor(private http: HttpClient) { }

  //Methods
  postData(username: string, password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, { username, password }, {
      withCredentials: true  // Ensure cookies are sent with the request
    });
  }
  //check if token is valid
  checktoken(): Observable<any>{
    return this.http.get<any>(this.apiUrlcheckauth, { withCredentials: true });
  }
  //logout
  //check if token is valid
  destroycookie(): Observable<any>{
    return this.http.get<any>(this.apiUrllogout, { withCredentials: true });
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrlGetCompanies, {
      withCredentials: true  // Ensure cookies are sent with the request
    });
  }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrlGetEmployees, { withCredentials: true });
  }
  getEmployeeDetails(): Observable<any>{
    return this.http.get<any>(this.apiUrlEmployeeDetails);
  }
  addEmployees(data: FormData): Observable<any>{
    return this.http.post<any>(this.apiUrlAddEmployee, data);
  }
  addCompany(data: FormData): Observable<any>{
    return this.http.post<any>(this.apiUrlAddCompany, data);
  }
  deleteCompany(data: { companyID: number }): Observable<any> {
    return this.http.delete<any>(this.apiUrlDeleteCompany, { body: data });
}
deleteEmployee(data: { employeeID: number }): Observable<any> {
  return this.http.delete<any>(this.apiUrlDeleteEmployee, { body: data });
}
viewCompany(data: any): Observable<any>{
  return this.http.post<any>(this.apiUrlViewCompany, data);
}
viewEmployee(data: any): Observable<any> {
  return this.http.post<any>(this.apiUrlViewEmployee, data)
}
  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }
}
