import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  isAppear :boolean= false;
  naam :any;
  constructor(private chatService: ChatService , private ServiceSrv : ServiceService , private router :ActivatedRoute) {
    this.user = this.ServiceSrv.getUserName();
    this.router.queryParams.subscribe(param=>{
      this.groupid = Number(param['groupid']);
      console.log(this.groupid);
      this.groupName = this.groupid.toString();
      console.log(this.groupName);
      if(this.groupid != 0){
        this.ServiceSrv.GetGroup(this.groupid).subscribe((res:any)=>{
          console.log(res);
           
          this.naam = res.name;
        })
      }else{
      this.naam= "Global Chat Of SplitWise"
      }
      
    })
    setTimeout(() => {
      const el = this.chatContainer.nativeElement;
    el.scrollTop = el.scrollHeight;
    }, 500);
  }
  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>;
  
  
  ngOnInit(): void {
    
    this.isAppear =true;
    this.chatService.startConnection(this.groupName, (user, messageGroup, message) => {
      this.messages.push({ sender: user, message ,sentAt : Date() });
      console.log( { sender: user, message ,sentAt : Date() } );
      setTimeout(() => {
        const el = this.chatContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
      }, 10);
    }).then(() => {
      this.chatService.getMessages(this.groupName).subscribe((msgs: any) => {
        this.isAppear =false;
        this.messages = msgs;
        console.log(msgs);
        setTimeout(() => {
          const el = this.chatContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
        }, 500);
        
      });
    });
    // console.log("user name is:", this.user);
    
  } 

  send() {
    const DateTime  = new Date();
    console.log(DateTime);
    
    if (this.message.trim()) {
      this.chatService.sendMessage(this.groupName, this.user, this.message ,DateTime.toLocaleString());



      this.message = ''; 
      
    } 
    setTimeout(() => {
      const el = this.chatContainer.nativeElement;
    el.scrollTop = el.scrollHeight;
    }, 50);
  }
}

