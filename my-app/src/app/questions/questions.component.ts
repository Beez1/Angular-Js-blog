import { Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent implements OnInit {
    @Input() btnText!: string;
  
    questionData = {
      title: '',
      categories: '',
      question: '',
      author: '',
      upvotes: '',
      date: '',
      answered: ''
    };
  
    constructor(private http: HttpClient, private router: Router) {}
  
    ngOnInit(): void {}
  
    submitForm2() {
      this.http.post<any>('http://localhost:3000/addQuestion', this.questionData).subscribe({
        next: response => {
          console.log(response);
          this.questionData = {
            title: '',
            categories: '',
            question: '',
            author: '',
            upvotes: '',
            date: '',
            answered: ''
          };
      this.router.navigate(['/displayQuestions']);
        },
        error: error => {
          console.error('Erro ao salvar a pergunta:', error);
        }
      });
    }
}