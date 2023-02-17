
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Token } from "@angular/compiler";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, observable, Subscription } from "rxjs";
import { HeaderType } from "../enum/header-type.enum";
import { NotificationType } from "../enum/notificaton-type.enum";
import { User } from "../model/user";
import { CustomHttpRespone } from '../model/custom-http-response';
import { AuthenticationService } from "../service/authentication.service";
import { NotificationService } from "../service/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  showLoading: boolean;
  private subscriptions: Subscription[] = [];
  Observable: any;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('Dashboard');
    } else {
      this.router.navigateByUrl("login");
    }
  }

  onLogin(user: User): void {
    this.showLoading = true;
    console.log(user);
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe({
        next: (Response: HttpResponse<User> | any) => {
          const token = Response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(Response.body);
          this.router.navigateByUrl('user/management');
          this.showLoading = false;
        },
        error: (errorREponse: HttpErrorResponse) => {
          console.log(errorREponse);
          this.sendErrorNotification(NotificationType.ERROR, errorREponse.message);
          this.showLoading = false;
        }
      })
    );
  }

  private sendErrorNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occured,please try again');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}



