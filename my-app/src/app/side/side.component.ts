import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-side',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css'] // Fix the property name here
})
export class SideComponent {
  currentQuestionIndex: number = 0;
  questions: { question: string, options: string[] }[] = [
    { question: 'Question 1: What is your favorite color?', options: ['Red', 'Blue', 'Green'] },
    { question: 'Question 2: What is your favorite animal?', options: ['Dog', 'Cat', 'Bird'] },
    { question: 'Question 5: What is your favorite hobby?', options: ['Reading', 'Sports', 'Cooking'] }

  ];
  selectedOptions: number[] = [];
  selectOption(optionIndex: number) {
    this.selectedOptions[this.currentQuestionIndex] = optionIndex;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }else{
      const correctOptionIndex = this.questions[2].options.indexOf("Reading");
      const selectedOptionIndex = this.selectedOptions[2];

    if (selectedOptionIndex === correctOptionIndex) {
      // O usuário selecionou a resposta correta
      console.log("O usuário selecionou a resposta correta para a terceira pergunta.");
    } else {
      // O usuário selecionou uma resposta incorreta
      console.log("O usuário selecionou uma resposta incorreta para a terceira pergunta.");
    }
    }
  }

  getSelectedAnswers() {
    return this.selectedOptions.map((selectedOption, index) => ({
      question: this.questions[index].question,
      selectedAnswer: this.questions[index].options[selectedOption]
    }));
  }

  logSelectedAnswers() {
    const selectedAnswers = this.getSelectedAnswers();
    console.log(selectedAnswers);
    console.log( this.questions[2].question);
  }

//  logSelectedAnswers();


}
