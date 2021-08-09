import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxMessageComponent } from '../ui/dialog-box-message/dialog-box-message.component';
import { SureDialogComponentComponent } from '../ui/sure-dialog-component/sure-dialog-component.component';

export class MyErrorHandler {
  constructor(private dialog: any) {}
  public handleError(err: HttpErrorResponse) {
    const dialogAnchor = this.dialog.open(DialogBoxMessageComponent, {
      data: {
        title: 'Error while connecting with server',
        message: err.statusText,
      },
    });
  }
}
