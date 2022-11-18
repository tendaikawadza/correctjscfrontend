import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';



import { throwError } from 'rxjs';
import { Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';

import { AuthenticationService } from '../service/authentication.service';
import { User } from '../service/model/user';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent implements OnInit ,OnDestroy{
 //public  showLoading: boolean;
 private subscriptions: Subscription[] = [];

  constructor(private router :Router, private  authenticationService:  AuthenticationService
    ,private notificationService:NotificationService
    )
    { 

  }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user/management');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

 
 
  public onLogin(user: User): void {
    console.log(user);
  
      this.subscriptions.push(
       this.authenticationService.login(user).subscribe(
        (response:HttpResponse<User>)=>{
          const token=response.headers.get('Jwt-Token');
          this.authenticationService.saveToken('token');
          if (response.body)
          this.authenticationService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('/user/management');
          
        },


        (errorResponse: HttpErrorResponse)=> {
          console.log(Error);
          this.sendErrorNotification(NotificationType.ERROR,errorResponse.message);

        }
       )

      );
    
  }
    private sendErrorNotification(notificationType:NotificationType, message: string) {
   
   
    if(message){
          this.notificationService.notify(notificationType,message)  ;

        }
    else{

      this.notificationService.notify(notificationType,'')  ;    
    }
  } 
  ngOnDestroy(): void {

  }


}
