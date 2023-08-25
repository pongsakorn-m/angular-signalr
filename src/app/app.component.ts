import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signal-r.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-signalr';

}
