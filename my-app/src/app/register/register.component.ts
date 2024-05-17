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

  userData = {
    name: '',
    email: '',
    password: ''
  };
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  submitForm() {
    this.http.post<any>('http://localhost:3000/saveUser', this.userData).subscribe({
      next: response => {
        console.log(response);
        this.userData = {
          name: '',
          email: '',
          password: ''
        };
        // Redireciona para a página user.component após o envio bem-sucedido
        this.router.navigate(['register']);
      },
      error: error => {
        console.error('Erro ao salvar usuário:', error);
      }
    });
  }
}
