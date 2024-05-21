import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';  
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-tools',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule, HttpClientModule],  
  templateUrl: './admin-tools.component.html',
  styleUrl: './admin-tools.component.css'
})
export class AdminToolsComponent {

}
