import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Output,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-add-members-modal',
  templateUrl: './add-members-modal.component.html',
  styleUrls: ['./add-members-modal.component.scss'],
})
export class AddMembersModalComponent implements OnInit {
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

  addCustomEmailAddress = {
    add: false,
    address: '',
  };
  @Input() membersEmails: string[];
  @Output() cancel = new EventEmitter<boolean>();
  @Output() value = new EventEmitter<any>();

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

  constructor(private http: HttpClient) {
    this.addedUsers = [];
    this.allEmails = [];
    this.membersEmails = [];
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
  onCloseClick() {
    this.cancel.emit();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.addedUsers.push(event.option.viewValue);
    this.emailInput.nativeElement.value = '';
    this.emailCtrl.setValue(null);
  }

  keyDownOnTextarea() {
    this.response$ = this.http.get(
      this.path + '/emails?substring=' + this.emailCtrl.value,
    );
    this.subscription = this.response$.subscribe(
      (res) => {
        this.allEmails = res.filter(
          (x: string) => !this.addedUsers.includes(x),
        );
        this.subscription.unsubscribe();
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
  }
  onAddMembersClick() {
    this.response1$ = this.http.post(this.path + '/users', this.addedUsers);
    this.subscription1 = this.response1$.subscribe((res) => {
      console.log(res);
      this.value.emit(res);
    });
  }
  ngOnInit(): void {
    this.addedUsers = this.membersEmails;
  }
  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription.unsubscribe();
  }
}
