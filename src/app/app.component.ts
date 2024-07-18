import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, UsersListComponent, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
