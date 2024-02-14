import { Component, Input, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent {
  @Input() pageId: string;
  @ViewChild('messagesContainer') private messagesContainer: ElementRef;

  message = '';
  messages: any[] = []
  isMinimized: boolean = false;
  userName = localStorage.getItem('userEmail')?.split('@')[0] || 'Unknown User'
  constructor(private chatService: ApiService) { }

  toggleChat() {
    this.isMinimized = !this.isMinimized;
  }
  sendMessage() {
    let body = {
      name: this.userName,
      text: this.message,
      createdAt: new Date().toString()
    }
    this.chatService.sendMessage(this.pageId, body);
    this.message = '';
    setTimeout(() => this.scrollToBottom(), 0); 
  }
 
  private scrollToBottom(): void {
    try {
      const container = this.messagesContainer.nativeElement;
      const isScrolledToBottom = container.scrollHeight - container.scrollTop <= container.clientHeight * 2;
      if (isScrolledToBottom) {
        container.scrollTop = container.scrollHeight;
      }
    } catch (err) { }
  }

  ngOnInit() {
    this.chatService.getMessages(this.pageId).subscribe(messages => {
      this.messages = messages;
      setTimeout(() => this.scrollToBottom(), 0); 
    });
  }
}
