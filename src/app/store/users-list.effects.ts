import { inject } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usersListActions from './users-list.actions';
import { UsersApiService } from '../services/users-api.service';
import { LocalstorageService } from '../services/localstorage.service';
import { selectUsers } from './users-list.selectors';

export const loadUsersEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const usersApiService = inject(UsersApiService);
    return actions$.pipe(
      ofType(usersListActions.loadUsers),
      switchMap(() => {
        return usersApiService.loadUsers().pipe(
          map((users) => {
            return usersListActions.loadUsersSuccess({ users: users });
          })
        );
      })
    );
  },
  { functional: true }
);

export const saveToLocalStorageEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    const localStorageService = inject(LocalstorageService);
    return actions$.pipe(
      ofType(
        usersListActions.loadUsersSuccess,
        usersListActions.deleteUser,
        usersListActions.addUser,
        usersListActions.editUser
      ),
      tap(() => {
        store.select(selectUsers).subscribe((users) => {
          localStorageService.setUsers(users);
        });
      })
    );
  },
  { dispatch: false, functional: true }
);
