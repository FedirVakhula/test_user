import { Component, OnInit } from '@angular/core';
import { HttpHelperService } from '../../services/http-helper.service';
import { User } from '../../models/user.interface';
import * as uuid from 'uuid';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  public users: User[] = [];
  public selectedUser!: User | null;
  public isFormOpened: boolean = false;

  constructor(
    private httpHelperService: HttpHelperService,
    private notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.initUsersList();
  }

  public onUserSelectChange(user: User): void {
    this.selectedUser = user;
    this.isFormOpened = true;
  }

  public onCreateUser(): void {
    this.isFormOpened = true;
    this.selectedUser = null;
  }

  public onCloseForm(): void {
    this.isFormOpened = false;
    this.selectedUser = null;
  }

  public onUpdateUser(user: User): void {
    this.httpHelperService.updateUser(user.id, user).subscribe({
      next: () => {
        this.initUsersList();
        this.isFormOpened = false;
        this.notificationService.showSuccess('Update User success');
      },
      error: () => {
        this.notificationService.showError('Update User fail');
      },
    });
  }

  public onCreateNewUser(user: Omit<User, 'id'>): void {
    this.httpHelperService.createNewUser({ ...user, id: uuid.v4() }).subscribe({
      next: () => {
        this.initUsersList();
        this.isFormOpened = false;
        this.notificationService.showSuccess('Create User success');
      },
      error: () => {
        this.notificationService.showError('Create User fail');
      },
    });
  }

  public onDeleteSelectedUser(user: User): void {
    this.httpHelperService.deleteUser(user.id).subscribe({
      next: () => {
        this.initUsersList();
        this.isFormOpened = false;
        this.notificationService.showSuccess('Delete User success');
      },
      error: () => {
        this.notificationService.showError('Delete User fail');
      },
    });
  }

  private initUsersList(): void {
    this.httpHelperService
      .getUsers()
      .subscribe((users) => (this.users = users));
  }
}
