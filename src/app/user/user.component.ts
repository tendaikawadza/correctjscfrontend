import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import {MenuItem, MessageService} from 'primeng/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private titleSubject =new BehaviorSubject <string>('Users');
  public titleAction$ = this.titleSubject.asObservable();

  items: MenuItem[];
    
  activeIndex: number = 0;
  constructor(private messageService: MessageService) { }

  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }



  getStock(){

  alert('do something');

  }

  onResetPassword(val:any){}
  ngOnInit(): void {
  
    this.items = [{
      label: 'Purchase Requarst Sent To Manager',
      command: (event: any) => {
          this.activeIndex = 0;
          this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label});
      }
  },
  {
      label: 'Seat',
      command: (event: any) => {
          this.activeIndex = 1;
          this.messageService.add({severity:'info', summary:'Seat Selection', detail: event.item.label});
      }
  },
  {
      label: 'Payment',
      command: (event: any) => {
          this.activeIndex = 2;
          this.messageService.add({severity:'info', summary:'Pay with CC', detail: event.item.label});
      }
  },
  {
      label: 'Confirmation',
      command: (event: any) => {
          this.activeIndex = 3;
          this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label});
      }
  }
];
  }
  complete(){}
  prevPage() {
    this.activeIndex--;
  }

  nextPage() {
    this.activeIndex++;
  }
  

}
