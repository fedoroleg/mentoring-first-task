import { createReducer, on } from '@ngrx/store';
import { UsersDbArray } from './usersDB';
import { User } from '../user.model';
import * as UsersListActions from './users-list.actions';

export interface UsersListState {
  users: User[];
}

export interface AppState {
  userList: {
    users: User[];
  };
}

const initialState: UsersListState = {
  users: [],
};

export const usersListReducer = createReducer(
  initialState,
  on(UsersListActions.loadUsersSuccess, (state, action) => {
    console.log('action', action);

    return {
      ...state,
      users: action.users,
    };
  }),
  on(UsersListActions.deleteUser, (state, action) => {
    const newUsers = state.users.filter((user) => user.id !== action.payload);
    return {
      ...state,
      users: newUsers,
    };
  }),
  on(UsersListActions.addUser, (state, { addedUser }) => {
    return {
      ...state,
      users: [...state.users, addedUser],
    };
  }),
  on(UsersListActions.editUser, (state, { editedUser }) => {
    const editedUsers = state.users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    );
    return {
      ...state,
      users: editedUsers,
    };
  })
);
