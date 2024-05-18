import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SideComponent } from './side/side.component';
import { RegisterComponent } from './register/register.component';
import { QuestionsComponent } from './questions/questions.component';
import { DisplayQuestionsComponent } from './display-questions/display-questions.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    SideComponent,
    RegisterComponent,
    DisplayQuestionsComponent,
    QuestionsComponent,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NavbarComponent

  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  btnText = 'send! '; //reusing the button from register component, just changing the button variable
  title = 'my-app';

  userData = {
    name: '',
    email: '',
    password: ''
  };
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    //search user in database
    this.http.get<any[]>('http://localhost:3000/users').subscribe({
      next: users => {
        this.users = users;
      },
      error: error => {
        console.error('Error fetching users:', error);
      }
    });
  }

  submitForm() {
    this.http.post<any>('http://localhost:3000/saveUser', this.userData).subscribe({
      next: response => {
        console.log(response);
        //clean up form after sent
        this.userData = {
          name: '',
          email: '',
          password: ''

        };
      },
      error: error => {
        console.error('Error to save user:', error);
      }
    });
  }

}
