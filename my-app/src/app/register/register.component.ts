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

  constructor(private http: HttpClient, private router: Router) {} // Injeção do Router adicionada

  ngOnInit(): void {}

  submitLoginForm() {
    this.http.post<any>('http://localhost:3000/login', this.loginData).subscribe({
      next: response => {
        console.log('Login response:', response);
        
        this.loginData = {
          email: '',
          password: ''
        };
        
        this.router.navigate(['home']); 
      },
      error: error => {
        console.error('Error login:', error);
      }
    });
  }

  submitRegisterForm() {
    this.http.post<any>('http://localhost:3000/saveUser', this.registerData).subscribe({
      next: response => {
        console.log(response);
        
        this.registerData = {
          email: '',
          password: ''
        };
        
        this.router.navigate(['/displayQuestions']); 
      },
      error: error => {
        console.error('Erro ao salvar usuário:', error);
      }
    });
  }
}
