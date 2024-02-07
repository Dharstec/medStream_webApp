import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({ 
  providedIn: 'root'
})
export class ChatService {
  constructor(private db: AngularFireDatabase) {}

  getMessages() {
    return this.db.list('/messages').valueChanges();
  }

  sendMessage(message:any) {
    this.db.list('/messages').push(message);
  }
}