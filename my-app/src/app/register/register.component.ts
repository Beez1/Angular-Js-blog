import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() btnText!: string;

  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  submitLoginForm() {
    this.http.post<any>('http://localhost:3000/login', this.loginData).subscribe({
      next: response => {
        this.loginData = {
          email: '',
          password: ''
        };

        const userName = response.user.name;
        this.router.navigate(['/home'], { queryParams: { userName: userName } });
      },
      error: error => {
        console.error('Error login:', error);
      }
    });
  }

  submitRegisterForm() {
    this.http.post<any>('http://localhost:3000/saveUser', this.registerData).subscribe({
      next: response => {
        this.registerData = {
          email: '',
          password: ''
        };

        this.router.navigate(['/displayQuestions']);
      },
      error: error => {
        console.error('Erro save user:', error);
      }
    });
  }
}
