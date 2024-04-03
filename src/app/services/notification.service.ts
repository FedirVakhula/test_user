import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  public showSuccess(message: string, dontClose: boolean = false): void {
    this.showNotification(message, 'success-notification', {
      duration: dontClose ? 0 : 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  public showError(message: string, dontClose: boolean = false): void {
    this.showNotification(message, 'error-notification', {
      duration: dontClose ? 0 : 5000,
      horizontalPosition: 'start',
      verticalPosition: 'top',
    });
  }

  private showNotification(
    message: string,
    panelClass: string,
    options: any = {}
  ): void {
    const config: MatSnackBarConfig = {
      panelClass: ['notification', panelClass],
      ...options,
      duration: options.duration || 5000,
    };
    this.snackBar.open(message, 'Close', config);
  }
}
