import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent {
  @Input() pageId: string;
  message = '';
  messages: any[] = []
  isMinimized: boolean = false;
  userName = localStorage.getItem('userEmail')?.split('@')[0] || 'Unknown User'
  constructor(private chatService: ApiService) { }

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
    this.chatService.sendMessage(this.pageId, body);
    this.message = '';
  }


  ngOnInit() {
    this.chatService.getMessages(this.pageId).subscribe(messages => {
      this.messages = messages;
    });
  }
}
