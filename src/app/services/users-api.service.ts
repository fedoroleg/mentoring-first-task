import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  http = inject(HttpClient);
  constructor() {}

  loadUsers() {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
}
