import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private baseUrl = 'https://localhost:7288'; // Change as needed

  constructor(private http: HttpClient) {}

  public async startConnection(groupName: string, onReceive: (user: string, message: string) => void): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/chatHub`,{
        withCredentials: true
      })
      .withAutomaticReconnect()
      .build();
  
    this.hubConnection.on("ReceiveMessage", onReceive);
  
    try {
      await this.hubConnection.start();
      console.log("SignalR Connected.");
      await this.hubConnection.invoke("JoinGroup", groupName);
    } catch (err) {
      console.error("SignalR Connection Error:", err);
    }
  }
  

  public sendMessage(groupName: string, user: string, message: string) {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke("SendMessage", groupName, user, message);
    } else {
      console.warn("SignalR not connected. Message not sent.");
    }
    this.saveMessage({ groupName, sender: user, message });
  }
  

  private saveMessage(message: any) {
    return this.http.post(`${this.baseUrl}/api/chat`, message).subscribe();
  }

  public getMessages(groupName: string) {
    return this.http.get(`${this.baseUrl}/api/chat/${groupName}`);
  }
}
