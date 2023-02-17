import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { faSlack } from '@fortawesome/free-brands-svg-icons';

import { first, Subscription } from 'rxjs';
import { NotificationType } from '../enum/notificaton-type.enum';
import { User } from '../model/user';
import { PeopleService } from '../people.service';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  [x: string]: any;
  peoplsDialog = false;
  private subscriptions: Subscription[] = [];
  public selectedUser: User;
  public profileImage: File;
  userForm:FormGroup;
  public users: User[];
  public refreshing: boolean;
  public Users: [];
  submitted =false;
  roles = [
    { name: 'accounts', code: 'accounts' },
    { name: 'admini', code: 'admini' },
    { name: 'human resourse', code: 'human resourse' },

];
  constructor(private authenticationService: AuthenticationService,private fb:FormBuilder, public peopleService: PeopleService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.getUsers(true);
   
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      Username: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Role: ['', [Validators.required]],
  });
  //this.productService.getAllProducts().subscribe(data => this.products = data);
}
get f(): any {
  return this.userForm.controls;
}


onSubmit(){
  this.submitted = true;
  if(this.userForm.invalid){
    return
  }
  console.log(this.userForm.value)
  this.authenticationService.register(this.userForm.value).subscribe(data=>{
    console.log(data);
  })
}

  public getUsers(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.peopleService.getUsers().subscribe(
        (response: User[]) => {
          this.peopleService.addUsersToLocalCache(response);
          this.users = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} user(s) loaded successfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = false;
        }
      )
    );

  }

  searchUser() { }

  public onProfileImageChange(event: any): void {
    console.log(event);




  }

  public onSelectUser(selectedUser: User): void {
    this['selectedUser'] = selectedUser;
    document.getElementById('openUserInfo')?.click();
  }

  public onAddNewUser(userForm: NgForm): void {



    // const formData = this.peopleService.createUserFormDate(null, userForm.value, this.profileImage);
    // this.subscriptions.push(
    //   this.peopleService.addUser(formData).subscribe(

    //     (Response: User) => {


    //     },

    //   ));
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }
  openNew(){
    this.peoplsDialog = true;
  }

  changeTitle() {

  }

}
