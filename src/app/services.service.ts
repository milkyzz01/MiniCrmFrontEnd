import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiResponse, PostData, Company, Employee } from './data.model';



@Injectable({
  providedIn: 'root'
})
export class ServicesService{

  //variables
  private apiUrl: string = 'http://localhost:3000/login';
  private apiUrlGetCompanies: string = 'http://localhost:3000/companies';
  private apiUrlGetEmployees: string = 'http://localhost:3000/employees';
  private apiUrlEmployeeDetails: string = 'http://localhost:3000/employeeDetails';
  private apiUrlAddEmployee: string = 'http://localhost:3000/addEmployee';
  private apiUrlViewCompany: string = 'http://localhost:3000/companyDetails';
  private apiUrlAddCompany: string = 'http://localhost:3000/addcompany';
  private apiUrlDeleteCompany: string = 'http://localhost:3000/deleteCompany';
  private apiUrlDeleteEmployee: string = 'http://localhost:3000/deleteEmployee';
  private apiUrlViewEmployee: string = 'http://localhost:3000/detailsEmployee';
  private apiUrlcheckauth: string = 'http://localhost:3000/check-auth';
  private apiUrllogout: string = 'http://localhost:3000/logout';
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
