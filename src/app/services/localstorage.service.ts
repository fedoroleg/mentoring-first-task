import { Injectable, inject } from '@angular/core';

import { User } from '../user.model';
import { Store } from '@ngrx/store';
import { selectUsers } from '../store/users-list.selectors';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  private readonly USERS_STORAGE_KEY = 'users';
  private readonly store$ = inject(Store);

  constructor() {
    // this.getUsers();
    // console.log('localst service works');
  }

  getUsers() {
    const usersJSON = localStorage.getItem(this.USERS_STORAGE_KEY);
    const users = JSON.parse(usersJSON!);
    return users;
  }

  setUsers(users: User[]) {
    localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(users));
  }
}
