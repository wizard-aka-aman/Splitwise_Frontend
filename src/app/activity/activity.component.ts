import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-activity',
  imports: [CommonModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {
  username : string = '';
  allActivity : any ;
  constructor() {

   }
}
