import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  groupName:string = '';
  user = '';
  message = '';
  groupid :any ;

  constructor(private chatService: ChatService , private ServiceSrv : ServiceService , private router :ActivatedRoute) {
    this.user = this.ServiceSrv.getUserName();
    this.router.queryParams.subscribe(param=>{
      this.groupid = Number(param['groupid']);
      console.log(this.groupid);
      this.groupName = this.groupid.toString();
      console.log(this.groupName);
      
    })
  }

  ngOnInit(): void {
    console.log(this.groupid);
    console.log(this.groupName);
    this.chatService.startConnection(this.groupName, (user, message) => {
      this.messages.push({ sender: user, message });
    }).then(() => {
      this.chatService.getMessages(this.groupName).subscribe((msgs: any) => {
        this.messages = msgs;
      });
    });
  }
  

  send() {
    console.log(this.groupid);
    console.log(this.groupName);
    if (this.message.trim()) {
      this.chatService.sendMessage(this.groupName, this.user, this.message);
      this.message = '';
    }
  }
}

