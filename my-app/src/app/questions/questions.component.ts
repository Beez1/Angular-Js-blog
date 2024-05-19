import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
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

    categories: string[] = []; // Array to store categories
    newCategory: string = ''; // Variable to store new category
  
    constructor(private http: HttpClient, private router: Router, private cdRef: ChangeDetectorRef) {}
    

  
    ngOnInit(): void {
        this.loadCategories();
    }

    loadCategories(): void {
        this.http.get<any[]>('http://localhost:3000/categories')
          .subscribe({
            next: (data) => {
              this.categories = data.map((category) => category.name);
            },
            error: (error) => {
              console.error('Error loading categories:', error);
            }
          });
      }

      trackByCategory(index: number, category: string): string {
        return category;
      }
      
      addCategory() {
        if (this.newCategory.trim()) {
          this.http.post<any>('http://localhost:3000/addCategory', { name: this.newCategory.trim() })
            .subscribe({
              next: (response) => {
                console.log('Category added:', response.name);
                this.categories.push(response.name); // Add category name to the array
                this.newCategory = '';
                // Trigger change detection after category is added
                this.cdRef.detectChanges();
              },
              error: (error) => {
                console.error('Error adding category:', error);
              }
            });
        }
      }
      
      
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
          console.error('Erro to save question:', error);
        }
      });
    }
}
