import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/models/chat';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {
  constructor(private router: Router,
              private signalRService: SignalRService) {
    this.username = this.router.getCurrentNavigation()?.extras?.state!['username'];
  }

  userCount$: Observable<number> = this.signalRService.userCount$.asObservable();
  chats$: Observable<Chat[]> = this.signalRService.chats$.asObservable();
  userList: string[] = [];
  message: string = '';
  username!: string;

  ngOnInit(): void {
    this.signalRService.startConnection().then(() => {
      console.log("connected");
      this.signalRService.connectGlobalChat();
    });

  }

  sendMessage() {
    let messageDto = new Chat();
    messageDto.username = this.username;
    messageDto.message = this.message;
    this.signalRService.hubConnection.invoke("SendMessage", messageDto);
  }


}
