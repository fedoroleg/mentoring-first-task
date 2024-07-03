import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersListState } from './users-list.reducer';

export const selectUserListState =
  createFeatureSelector<UsersListState>('usersList');

export const selectUsers = createSelector(
  selectUserListState,
  (state: UsersListState) => state.users
);
