import { createAction, props } from '@ngrx/store';
import { User } from '../user.model';


export const loadUsers = createAction(
  '[Users List] Load Users'
)

export const loadUsersSuccess = createAction(
  '[Users List] Load Users Success',
  props<{users: User[]}>()
)

export const deleteUser = createAction(
  '[Users List] Delete User',
  props<{ payload: number | string }>()
);

export const addUser = createAction(
  '[Users List] Add User',
  props<{addedUser: User}>()
)

export const editUser = createAction(
  '[Users List] Edit User',
  props<{editedUser: User}>()
)
