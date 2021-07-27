import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, VirtualTimeScheduler } from 'rxjs';
import { Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-add-members-modal',
  templateUrl: './add-members-modal.component.html',
  styleUrls: ['./add-members-modal.component.scss'],
})
export class AddMembersModalComponent implements OnInit {
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  addCustomEmailAddress = {
    add: false,
    address: '',
  };

  path = GlobalVariables.GlobalServerPath;
  headers = new HttpHeaders();
  subscription = new Subscription();
  response$ = new Observable<any>();
  subscription1 = new Subscription();
  response1$ = new Observable<any>();
  emailCtrl = new FormControl();
  filteredEmails = new Observable<string[]>();

  addedUsers: string[];
  allEmails: string[];

  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.addedUsers = [];
    this.allEmails = [];
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');

    this.filteredEmails = this.emailCtrl.valueChanges.pipe(
      startWith(null),
      map((email: string | null) =>
        email ? this._filter(email) : this.allEmails.slice(),
      ),
    );
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.addedUsers.push(value);
    }

    event.chipInput!.clear();

    this.emailCtrl.setValue(null);
  }

  remove(email: string): void {
    const index = this.addedUsers.indexOf(email);

    if (index >= 0) {
      this.addedUsers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.addedUsers.push(event.option.viewValue);
    this.emailInput.nativeElement.value = '';
    this.emailCtrl.setValue(null);
  }

  keyDownOnTextarea() {
    this.response$ = this.http.get(
      this.path + '/findUserByEmail?substring=' + this.emailCtrl.value,
    );
    this.subscription = this.response$.subscribe(
      (res) => {
        this.allEmails = res;
      },
      (err) => console.log(err.error),
    );
  }
  private _filter(value: string): string[] {
    const emailValue = value.toLowerCase();

    return this.allEmails.filter((email) =>
      email.toLowerCase().includes(emailValue),
    );
  }
  onEmailOnContextClicked(event: any) {
    if (this.addedUsers[0] == '') this.addedUsers = event.target.innerText;
    else this.addedUsers.push(event.target.innerText);
    console.log(this.addedUsers);
  }
  onAddMembersClick() {
    this.response1$ = this.http.post(this.path + '/users', this.addedUsers);
    this.subscription1 = this.response1$.subscribe((res) => console.log(res));
  }
  ngOnInit(): void {}
}
