import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { UserFormComponent } from '../components/user-form/user-form.component';

@Injectable({
  providedIn: 'root',
})
export class UserValidatorsService {
  static UserNameUnique(component: UserFormComponent) {
    return (control: FormControl) => {
      const existsUserName = component.userList.find(
        (user) => user.userName === control.value
      );
      if (existsUserName && component.userData !== existsUserName) {
        return { message: 'This username already exist' } as ValidationErrors;
      }
      return null;
    };
  }

  static ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
