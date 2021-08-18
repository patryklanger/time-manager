import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxMessageComponent } from '../ui/dialog-box-message/dialog-box-message.component';

export class MyErrorHandler {
  constructor(private dialog: MatDialog) {}
  public handleError(err: HttpErrorResponse) {
    var message: string;
    if (typeof err.error === 'string') message = err.error;
    else message = err.statusText;

    const dialogAnchor = this.dialog.open(DialogBoxMessageComponent, {
      data: {
        title: 'Something went wrong!',
        message: message,
      },
    });
    dialogAnchor.afterClosed().subscribe(() => location.reload());
  }
}
