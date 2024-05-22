import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterOutlet, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
    
  isHomeRoute: boolean = false;
  userName: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.router.events.subscribe(() => {
    //   this.isHomeRoute = this.router.url === '/home';
    // });
    this.route.queryParams.subscribe(params => {
      this.userName = params['userName'] || 'Guest';
      console.log('User Name:', this.userName); // Para debug
    });
  }
}
