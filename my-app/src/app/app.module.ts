import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { RegisterComponent } from './register/register.component';
import { QuestionsComponent } from './questions/questions.component';
import { DisplayQuestionsComponent } from './display-questions/display-questions.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'displayQuestions', component: DisplayQuestionsComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    RegisterComponent,
    QuestionsComponent,
    DisplayQuestionsComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [AuthService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
