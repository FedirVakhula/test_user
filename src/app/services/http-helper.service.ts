import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpHelperService {
  private readonly baseUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/users`);
  }

  public deleteUser(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/users/${id}`);
  }

  public updateUser(id: string, body: User): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/users/${id}`, body);
  }

  public createNewUser(user: User): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/users`, user);
  }
}
