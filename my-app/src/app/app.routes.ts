import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { QuestionsComponent } from './questions/questions.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DisplayQuestionsComponent } from './display-questions/display-questions.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'displayQuestions', component: DisplayQuestionsComponent },
  { path: 'adminTools', component: AdminToolsComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
