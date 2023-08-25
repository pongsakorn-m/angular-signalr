import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }

  public hubConnection!: HubConnection;
  public userCount$: Subject<number> = new Subject();
  public chats$: BehaviorSubject<Chat[]> = new BehaviorSubject<Chat[]>([]);

  public startConnection() {
    return new Promise((resolve, reject) => {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:7065/Hub")
        .withAutomaticReconnect()
        .build();

      this.hubConnection.start()
        .then(() => {
          console.log("connection established");

          this.hubConnection.on("GetConnectionId", (connectionId: string) => {
            localStorage.setItem('connectionId', connectionId);
            console.log(localStorage.getItem('connectionId'));
          })

          this.hubConnection.on("UpdateCount", (count: number) => {
            this.userCount$.next(count);
          })

          return resolve(true);
        })
        .catch((err: any) => {
          console.log("error occured" + err);
          reject(err);
        });
    });
  }

  public connectGlobalChat() {
    this.hubConnection.on("GlobalChat", (chats: Chat[]) => {
      console.log(chats);
      this.chats$.next(chats);
    });
  }


}
