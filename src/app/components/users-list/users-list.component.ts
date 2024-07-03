import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { User } from '../../user.model';
import { UserCardComponent } from '../user-card/user-card.component';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import * as userListActions from '../../store/users-list.actions';
import * as usersListSelectors from '../../store/users-list.selectors';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    CreateEditUserComponent,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);
  private readonly localStorageService = inject(LocalstorageService);
  public users$ = this.store.select(usersListSelectors.selectUsers);

  ngOnInit() {
    const usersInLocalStorage = this.localStorageService.getUsers();
    console.log('что в сторадже', this.localStorageService.getUsers());

    if (usersInLocalStorage === null || usersInLocalStorage.length === 0) {
      console.log('local storage === null or 000');
      this.store.dispatch(userListActions.loadUsers());
    } else {
      this.store.dispatch(
        userListActions.loadUsersSuccess({ users: usersInLocalStorage })
      );
    }
  }

  onDeleteUser(id: number | string) {
    this.store.dispatch(userListActions.deleteUser({ payload: id }));
  }

  onEditUser(id: number | string) {
    let userToEdit: User | undefined;
    this.users$.subscribe((users) => {
      userToEdit = users.find((user) => user.id === id);
    });
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: {
        editMode: true,
        user: userToEdit,
      },
    });
    dialogRef.afterClosed().subscribe((editedUser) => {
      if (editedUser) {
        this.store.dispatch(
          userListActions.editUser({ editedUser: { ...editedUser, id } })
        );
      }
    });
  }

  onAddUser(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: {
        editMode: false,
      },
    });

    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        const newUser = { ...formData, id: uuidv4() };
        this.store.dispatch(userListActions.addUser({ addedUser: newUser }));
      }
    });
  }
}
