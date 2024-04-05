import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { User, UserType } from '../../../../models/user.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserValidatorsService } from '../../services/user-validators.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  @Input() public set user(value: User | null) {
    if (!this.form) {
      this.initUserForm();
    }
    this.userData = value;
    if (value) {
      this.form.setValue({
        userName: value.userName,
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        type: value.type,
        userPassword: {
          password: value.password,
          repeatPassword: value.password,
        },
      });
    } else {
      this.form.reset();
    }
  }

  @Input() public userList: User[] = [];
  @Output() public closeForm: EventEmitter<void> = new EventEmitter();
  @Output() public deleteSelectedUser: EventEmitter<User> = new EventEmitter();
  @Output() public updateUser: EventEmitter<User> = new EventEmitter();
  @Output() public createUser: EventEmitter<Omit<User, 'id'>> =
    new EventEmitter();

  public get title(): string {
    return this.userData
      ? `${this.userData.firstName} ${this.userData.lastName}`
      : 'Create new user';
  }

  public userTypeList = [UserType.Admin, UserType.Driver];
  public userAdmin = UserType.Admin;
  public userData!: User | null;
  public form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  public ngOnInit(): void {
    if (!this.form) {
      this.initUserForm();
    }
  }

  public saveUser(): void {
    if (!this.form.invalid || this.form.touched) {
      const { userName, firstName, lastName, email, type, userPassword } =
        this.form.value;
      const newUser = {
        userName,
        firstName,
        lastName,
        email,
        type,
        password: userPassword.password,
        id: this.userData?.id!,
      };
      this.updateUser.emit(newUser);
    }
  }

  public deleteUser(): void {
    if (this.userData?.type !== UserType.Admin) {
      this.deleteSelectedUser.emit(this.userData!);
    } else {
      this.router.navigateByUrl('forbidden');
    }
  }

  public onCreateUser(): void {
    const { userName, firstName, lastName, email, type, userPassword } =
      this.form.value;
    const newUser = {
      userName,
      firstName,
      lastName,
      email,
      type,
      password: userPassword.password,
    };
    this.createUser.emit(newUser!);
  }

  private initUserForm(): void {
    this.form = this.fb.group({
      userName: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          UserValidatorsService.UserNameUnique(this) as ValidatorFn,
        ],
      }),
      firstName: new FormControl<string>('', Validators.required),
      lastName: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      type: new FormControl<string>('', Validators.required),
      userPassword: this.fb.group<{
        password: FormControl<string | null>;
        repeatPassword: FormControl<string | null>;
      }>(
        {
          password: new FormControl<string | null>(null, [
            Validators.required,
            Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}'),
          ]),

          repeatPassword: new FormControl<string | null>(
            null,
            Validators.required
          ),
        },
        {
          validators: [
            UserValidatorsService.ConfirmedValidator(
              'password',
              'repeatPassword'
            ) as ValidatorFn,
          ],
        }
      ),
    });
  }
}
