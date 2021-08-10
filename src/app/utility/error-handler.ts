import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxMessageComponent } from '../ui/dialog-box-message/dialog-box-message.component';

export class MyErrorHandler {
  constructor(private dialog: MatDialog) {}
  public handleError(err: HttpErrorResponse) {
    console.log(err);
    var message: string;
    if (typeof err.error === 'string') message = err.error;
    else message = err.statusText;

    const dialogAnchor = this.dialog.open(DialogBoxMessageComponent, {
      data: {
        title: 'Error while connecting with server',
        message: message,
      },
    });
  }
}
