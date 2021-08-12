import * as GlobalVariables from '../../globals';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-log-card',
  templateUrl: './log-card.component.html',
  styleUrls: ['./log-card.component.scss'],
})
export class LogCardComponent implements OnInit {
  errorHandler = new MyErrorHandler(this.dialog);
  @Input() log: {
    modificationType: string;
    timeOfModification: string;
    targetType: string;
    itemId: number;
    userName: string;
  } = {
    modificationType: '',
    timeOfModification: '',
    targetType: '',
    itemId: -1,
    userName: '',
  };

  username = 'UNKNOWN';
  modificationDate = new Date();
  modified = 'UNKNOWN';
  icon = 'error';

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  setModificationType() {
    if (this.log.modificationType == 'CREATE') {
      this.modified = 'Created at ';
      this.icon = 'add';
    } else if (this.log.modificationType == 'DELETE') {
      this.modified = 'Deleted at ';
      this.icon = 'delete';
    } else if (this.log.modificationType == 'UPDATE') {
      this.modified = 'Editted at ';
      this.icon = 'edit';
    }
  }

  ngOnInit(): void {
    this.modificationDate = new Date(this.log.timeOfModification);
    this.setModificationType();
  }
  ngOnDestroy() {}
}
