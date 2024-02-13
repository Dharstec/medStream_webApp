import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent {
  message = '';
  messages: any[] = []
  isMinimized: boolean = false;
  userName = localStorage.getItem('userEmail')?.split('@')[0] || 'Unknown User'
  constructor(private chatService: ChatService) { }

  toggleChat() {
    this.isMinimized = !this.isMinimized;
  }
  sendMessage() {
    console.log(this.userName)
    let body = {
      name: this.userName,
      text: this.message,
      createdAt: new Date().toString()
    }
    this.chatService.sendMessage(body);
    this.message = '';
  }

  ngOnInit() {
    this.chatService.getMessages().subscribe(messages => {
      this.messages = messages;
    });
  }
}