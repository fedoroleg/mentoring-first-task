import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent {
  public readonly data = inject(MAT_DIALOG_DATA);
  public readonly dialogRef = inject(MatDialogRef<CreateEditUserComponent>);
  private readonly formBuilder = inject(FormBuilder);
  public userForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    website: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });
  private readonly user = this.data.user;

  ngOnInit() {
    if (this.data.user) {
      this.userForm.patchValue(this.data.user);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
