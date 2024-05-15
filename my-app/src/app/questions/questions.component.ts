import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importe o HttpClient
import { FormsModule } from '@angular/forms'; // Importe FormsModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule


@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})

export class QuestionsComponent implements OnInit {
  @Input() btnText!: string;

  questionData = { // define questionData
    title: '',
    categories: '',
    question: '',
    author: '',
    upvotes: '',
    date: '',
    answered: ''
  };
  question: any[] = [];

  constructor(private http: HttpClient) {} // injection  HttpClient in the constructor

  ngOnInit(): void {

  }

  submitForm2() {
    this.http.post<any>('http://localhost:3000/addQuestion', this.questionData).subscribe({
      next: response => {
        console.log(response);
        // clean up form after send data
        this.questionData = {
          title: '',
          categories: '',
          question: '',
          author: '',
          upvotes: '',
          date: '',
          answered: ''
        };
      },
      error: error => {
        console.error('Erro to save question:', error);
      }
    });
  }


}
