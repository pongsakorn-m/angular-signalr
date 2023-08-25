import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) { }

  username!: string;

  start() {
    if (!this.username) {
      alert('Please input your name.');
      return;
    }

    this.router.navigate(['chat-list'], { state: { username: this.username} });
  }
}
