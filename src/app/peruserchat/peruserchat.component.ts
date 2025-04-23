import { CommonModule } from '@angular/common';
import { Component, ElementRef, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-peruserchat',
  imports: [CommonModule , FormsModule],
  templateUrl: './peruserchat.component.html',
  styleUrl: './peruserchat.component.css'
})
export class PeruserchatComponent {

  
  messages: any[] = [];
  groupName:string = '';
  user = '';
  message = '';
  
  isAppear :boolean= false;
  constructor(private chatService: ChatService , private ServiceSrv : ServiceService , private router :ActivatedRoute) {
    this.user = this.ServiceSrv.getUserName();
    this.router.paramMap.subscribe(params => {
      this.groupName = String(params.get('groupname'));
       
    }); 
    console.log( "groupname : "+this.groupName);
    console.log("user : "+this.user);
    
  }
  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>;
  
  
  ngOnInit(): void {
     
    this.chatService.startConnection(this.user, (sender, messageGroup, message) =>  {
      if (messageGroup === this.groupName) {
        this.messages.push({ groupName: messageGroup, sender, message, sentAt: Date() });
      setTimeout(() => {
        const el = this.chatContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
      }, 10); 
      console.log({ groupName: messageGroup, sender, message, sentAt: Date() });
    }
    }).then(() => {
      this.isAppear =true;
      this.chatService.PersonalChat(this.groupName ,this.user).subscribe((msgs: any) => {
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
  // ngOnInit(): void {
     
  //   this.chatService.startConnection(this.user, (groupName , message) => {
  //     this.messages.push({ groupName : this.groupName ,sender: groupName, message ,sentAt : Date() });
  //     setTimeout(() => {
  //       const el = this.chatContainer.nativeElement;
  //     el.scrollTop = el.scrollHeight;
  //     }, 10); 
  //     console.log(  {groupName : this.groupName ,sender: groupName, message ,sentAt : Date() }  );
      
  //   }).then(() => {
  //     this.isAppear =true;
  //     this.chatService.PersonalChat(this.groupName ,this.user).subscribe((msgs: any) => {
  //       this.isAppear =false;
        
  //       this.messages = msgs;
  //       console.log(msgs);
  //       setTimeout(() => {
  //         const el = this.chatContainer.nativeElement;
  //       el.scrollTop = el.scrollHeight;
  //       }, 500);
        
  //     });
  //   });
  //   // console.log("user name is:", this.user);
    
  // } 
  
   

  send() {
    const DateTime  = new Date();
    console.log(DateTime);
    
    if (this.message.trim()) {
      this.chatService.sendMessage(this.user, this.groupName, this.message ,DateTime.toLocaleString());
    
       // Show message locally for sender
       this.messages.push({
        groupName: this.user,
        sender: this.groupName,
        message: this.message,
        sentAt: DateTime.toLocaleString()
      });
      this.message = ''; 
      
    } 
    
    setTimeout(() => {
      const el = this.chatContainer.nativeElement;
    el.scrollTop = el.scrollHeight;
    }, 50);
  }

}
