import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-admin-tools',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterModule, FormsModule, HttpClientModule],
    templateUrl: './admin-tools.component.html',
    styleUrls: ['./admin-tools.component.css']
})
export class AdminToolsComponent implements OnInit {
    questions: any[] = [];
    filteredQuestions: any[] = [];
    answeredFilter: string = '';

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.http.get<any[]>('http://localhost:3000/displayQuestions').subscribe({
            next: questions => {
                this.questions = questions;
                this.filterQuestions();
            },
            error: error => {
                console.error('Error fetching questions:', error);
            }
        });
    }

    filterQuestions(): void {
        this.filteredQuestions = this.questions.filter(quest => {
            if (this.answeredFilter === 'true') {
                return quest.answered === true; // answer
            } else if (this.answeredFilter === 'false') {
                return quest.answered === false; //not anwser
            } else {
                return true; // show all questions
            }
        });
    }

    toggleAnswerBox(quest: any): void {
        quest.showAnswerBox = !quest.showAnswerBox;
    }

    sendAnswer(quest: any): void {
        const answerData = {
            questionId: quest._id,
            answer: quest.userAnswer
        };
        
        this.http.post('http://localhost:3000/addAnswer', answerData).subscribe({
            next: response => {
                console.log('Answer saved:', response);
                quest.answered = true;
                quest.showAnswerBox = false;
                this.filterQuestions();
            },
            error: error => {
                console.error('Error saving answer:', error);
            }
        });
    }

    showAnswers(quest: any): void {
        this.http.get<any[]>(`http://localhost:3000/getAnswers/${quest._id}`).subscribe({
            next: answers => {
                quest.answers = answers;
                quest.showAnswers = true;
            },
            error: error => {
                console.error('Error fetching answers:', error);
            }
        });
    }
}