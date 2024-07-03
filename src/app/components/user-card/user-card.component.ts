import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../user.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatListModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() deleteUser = new EventEmitter<number | string>();
  @Output() editUser = new EventEmitter<number | string>();

  onDeleteUser() {
    this.deleteUser.emit(this.user.id);
  }

  onEditUser() {
    this.editUser.emit(this.user.id);
  }
}
