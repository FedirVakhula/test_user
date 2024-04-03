import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UsersComponent } from './users.component';
import { MatTableModule } from '@angular/material/table';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UserListComponent, UsersComponent, UserFormComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    SharedModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
