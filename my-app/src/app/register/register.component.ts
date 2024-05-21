import { Component, Input, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule], // Remove HttpClientModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  @Input() btnText!: string;

  userData = {
    name: '',
    email: '',
    password: '',
    acessLevel: 1
  };
  users: any[] = [];

  constructor(private authService: AuthService, private router: Router, private http: HttpClientModule) {}

  ngOnInit(): void {}

  submitForm() {
    this.authService.register(this.userData.name, this.userData.email, this.userData.password, this.userData.acessLevel).subscribe({
      next: response => {
        this.userData = {
             name: '',
             email: '',
             password: '',
            acessLevel: 1
            };            
            this.router.navigate(['/displayQuestions']);
      },
      error: error => {
        console.error('Error register question', error);
      }
    });
  }
}
