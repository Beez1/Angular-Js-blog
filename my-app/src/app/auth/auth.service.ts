// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';




@Injectable({
  providedIn: 'any'
})
export class AuthService {

  constructor(private http: HttpClient,) { }

  login(email: string, password: string) {
    return this.http.post('/login', { email, password });
  }

  register(name: string, email: string, password: string, acessLevel: number) {
    return this.http.post('/register', { name, email, password, acessLevel });
  }

  logout() {
    return this.http.get('/logout');
  }
}
