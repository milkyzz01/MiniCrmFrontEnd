import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  isLoading: boolean = false;

  constructor(private servicesService: ServicesService) {
    this.servicesService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });
  }
}
