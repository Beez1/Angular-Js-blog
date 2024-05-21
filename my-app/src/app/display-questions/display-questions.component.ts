import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';  
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-questions',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule, HttpClientModule], 
  templateUrl: './display-questions.component.html',
  styleUrl: './display-questions.component.css'
})
export class DisplayQuestionsComponent implements OnInit {
    question: any[] = [];

  constructor(private http: HttpClient) { }

   ngOnInit(): void {
     this.http.get<any[]>('http://localhost:3000/displayQuestions').subscribe({
       next: question => {
         this.question = question;
       },
       error: error => {
         console.error('Error fetching questions:', error);
       }
     });
   }

/*
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
 */
}
