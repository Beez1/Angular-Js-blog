import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importe o HttpClient
import { FormsModule } from '@angular/forms'; // Importe FormsModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  @Input() btnText!: string;

  userData = { // define userData
    name: '',
    email: '',
    password: ''
  };
  users: any[] = [];

  constructor(private http: HttpClient) {} // injection  HttpClient in the constructor

  ngOnInit(): void {

  }

  submitForm() {
    this.http.post<any>('http://localhost:3000/saveUser', this.userData).subscribe({
      next: response => {
        console.log(response);
        // clean up form after send data
        this.userData = {
          name: '',
          email: '',
          password: ''
        };
      },
      error: error => {
        console.error('Erro to save user:', error);
      }
    });
  }
}
