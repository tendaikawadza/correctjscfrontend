import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from './model/custom-http-response';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private host = environment.apiUrl;
  constructor(private http: HttpClient) {}
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/list`);

      }

      public addUser(formData: FormData): Observable<User> {
        return this.http.post<User>(`${this.host}/user/add`, formData);
      }

      public updateUser(formData: FormData): Observable<User> {
        return this.http.post<User>(`${this.host}/user/update`, formData);
      }


      public deleteUser(username: string): Observable<CustomHttpRespone> {
        return this.http.delete<CustomHttpRespone>(`${this.host}/user/delete/${username}`);
      }
      
      
      public addUsersToLocalCache(users: User[]): void {
        localStorage.setItem('users', JSON.stringify(users));
      }










}
