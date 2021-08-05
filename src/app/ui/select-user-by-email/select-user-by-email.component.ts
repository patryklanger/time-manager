import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { Observable, Subscriber, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';
import { MatDialog } from '@angular/material/dialog';
import { SureDialogComponentComponent } from '../sure-dialog-component/sure-dialog-component.component';
import { DialogBoxMessageComponent } from '../dialog-box-message/dialog-box-message.component';

@Component({
  selector: 'app-select-user-by-email',
  templateUrl: './select-user-by-email.component.html',
  styleUrls: ['./select-user-by-email.component.scss'],
})
export class SelectUserByEmailComponent implements OnInit {
  filteredEmails = new Observable<string[]>();

  allEmails: string[] = [];

  emailCtrl = new FormControl('', [Validators.email]);

  getEmailsResponse$ = new Observable<any>();
  getEmailsSubscription = new Subscription();

  response$ = new Observable<any>();
  subscription = new Subscription();

  assignResponse$ = new Observable<any>();
  assignSubscription = new Subscription();

  @Output() close = new EventEmitter<number>();

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.filteredEmails = this.emailCtrl.valueChanges.pipe(
      startWith(null),
      map((email: string | null) =>
        email ? this._filter(email) : this.allEmails.slice(),
      ),
    );
  }

  keyDownOnTextarea() {
    this.getEmailsResponse$ = this.http.get(
      GlobalVariables.GlobalServerPath +
        '/emails?substring=' +
        this.emailCtrl.value,
    );
    console.log(
      GlobalVariables.GlobalServerPath +
        '/emails?substring=' +
        this.emailCtrl.value,
    );
    this.getEmailsSubscription = this.getEmailsResponse$.subscribe(
      (res) => {
        console.log(res);
        this.allEmails = res;
        this.getEmailsSubscription.unsubscribe();
      },
      (err) => {
        console.log(err.error);
        this.getEmailsSubscription.unsubscribe();
      },
    );
  }
  private _filter(value: string): string[] {
    const emailValue = value.toLowerCase();

    return this.allEmails.filter((email) =>
      email.toLowerCase().includes(emailValue),
    );
  }
  checkMailValidity(inputEmail: string) {
    const tempArray: string[] = [];
    tempArray.push(inputEmail);

    let userId;

    let responseObject: {
      UserInDB: {
        userId: number;
        userName: string;
        firstName: string;
        lastName: string;
        position: string;
        email: string;
        role: string;
      }[];
      UserNoInDB: string[];
    };
    this.response$ = this.http.post(
      GlobalVariables.GlobalServerPath + '/users',
      tempArray,
    );
    this.subscription = this.response$.subscribe(
      (res) => {
        responseObject = res;
        this.subscription.unsubscribe();
        if (responseObject.UserInDB.length > 0) {
          console.log(responseObject.UserInDB[0]);
          userId = responseObject.UserInDB[0].userId;
          this.close.emit(userId);
        } else this.userInvalid(inputEmail);
      },
      (err) => {
        userId = -1;
        this.userInvalid(inputEmail);
      },
    );
  }
  userInvalid(userEmail: string) {
    const dialogAnchor = this.dialog.open(DialogBoxMessageComponent, {
      data: {
        title: 'Invalid user email',
        message: "We didn't find user that is registred with " + userEmail,
      },
    });
    dialogAnchor.afterClosed().subscribe((e) => {
      this.emailCtrl.setValue('');
    });
  }

  onAssignClick() {
    this.checkMailValidity(this.emailCtrl.value);
  }
  onCloseClick() {
    this.close.emit(-1);
  }
  selected(event: MatAutocompleteSelectedEvent) {
    let userId = this.checkMailValidity(event.option.value);
  }
  ngOnInit(): void {}
}
