interface MyData {
    iser_id: number;    
    username: string;
    password: string;
}

export interface ApiResponse {
    message: string;    
    results: MyData[];  
}

export interface PostData {
    username: string;
    password: string;
}

export interface Company {
    companyID: number;
    companyName: string;
    companyLogo: string;
    companyEmail: string;
}

export interface Employee {
    employeeID: number;
    employeeName: string;
    employeeCompany: number;
    dateCreated: string;
    companyName: string;
}