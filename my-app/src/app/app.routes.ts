import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { QuestionsComponent } from './questions/questions.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DisplayQuestionsComponent } from './display-questions/display-questions.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'displayQuestions', component: DisplayQuestionsComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];
