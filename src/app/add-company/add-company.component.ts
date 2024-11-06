import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ServicesService } from '../services.service';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from "../loader/loader.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-company',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, CommonModule, MatInputModule, MatSelectModule, FormsModule, LoaderComponent],
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {

  // Variables
  companyName: string = '';
  companyEmail: string = '';
  companyLogo: File | null = null; 
  companyAddress: string = '';
  companyPhone: string = '';

  constructor(private service: ServicesService) {}

  //methods
  goBack() {
    window.history.back(); // Go back to the previous page
  };
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.companyLogo = input.files[0]; // Get the selected file
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('companyName', this.companyName);
    formData.append('companyEmail', this.companyEmail);
  
    if (this.companyLogo) {
      formData.append('companyLogo', this.companyLogo); 
    } else {
      console.warn('No company logo selected.');
    }
  
    formData.append('companyAddress', this.companyAddress);
    formData.append('companyPhone', this.companyPhone);
  
    this.service.setLoading(true);
    this.addCompany(formData);
  }

  addCompany(data: FormData) {
    this.service.addCompany(data).subscribe({
      next: (response: any) => {
        if (response.message === 'Success' && response.result.affectedRows > 0) {
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
        console.log(err);
        this.service.setLoading(false);
        Swal.fire({
          title: 'Error',
          text: 'Failed to insert.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
