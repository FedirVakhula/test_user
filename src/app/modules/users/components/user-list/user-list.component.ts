import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { User } from '../../../../models/user.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @Input() public set data(value: User[]) {
    this.dataSource.data = value;
  }
  @Output() public userSelectChange: EventEmitter<User> = new EventEmitter();

  public selectedUser: User | null = null;

  public displayedColumns: string[] = [
    'userName',
    'firstName',
    'lastName',
    'email',
    'type',
  ];
  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  public userSelect(user: User): void {
    this.userSelectChange.emit(user);
    this.selectedUser = user;
  }
}
